import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InviteRequest {
  inviteId: string;
  teamName: string;
  competitionId: string;
  inviteeEmail: string;
  token: string;
}

// Function to format competition ID to readable name
const formatCompetitionName = (competitionId: string): string => {
  const competitionNames: Record<string, string> = {
    "exploring-world-of-science": "Exploring the World of Science",
    "space-settlement": "Space Settlement Competition",
    "space-settlement-2025": "Space Settlement Competition 2025",
    "satellite-launch-2026": "Satellite Launch Competition 2026",
  };

  return competitionNames[competitionId] || competitionId;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_ANON_KEY") ?? "");

    const { inviteId, teamName, competitionId, inviteeEmail, token }: InviteRequest = await req.json();

    console.log("Sending team invite - Competition:", competitionId);

    // Rate limiting: Check recent invites from this team
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data: recentInvites, error: countError } = await supabase
      .from("invites")
      .select("id", { count: "exact", head: true })
      .eq("team_id", teamName) // Using teamName as proxy - ideally use team_id from request
      .gte("created_at", oneHourAgo);

    if (countError) {
      console.error("Error checking rate limit:", countError);
    } else if (recentInvites && (recentInvites as any).count >= 10) {
      console.log("Rate limit exceeded for team");
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Maximum 10 invitations per hour." }), {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Use the configured app URL from environment variable
    const baseUrl = Deno.env.get("APP_URL") || "https://pigoiwdkwdrrodftbkkm.aeroo.space";
    const inviteUrl = `${baseUrl}/auth?invite=${token}`;

    console.log("Sending invitation email");

    const competitionName = formatCompetitionName(competitionId);

    const emailResponse = await resend.emails.send({
      from: "AEROO <noreply@aeroo.space>",
      to: [inviteeEmail],
      subject: `🪐 Mission Invitation: Join Crew ${teamName} - ${competitionName}`,
      html: `
  <div style="margin:0;padding:0;background:#0a0f1c;font-family:'Inter','Segoe UI',Roboto,Arial,sans-serif;color:#e2e8f0;">
    <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
      <div style="padding:2px;background:linear-gradient(135deg,#22c55e,#06b6d4,#7c3aed);border-radius:18px;">
        <div style="background:#0b1220;border-radius:16px;padding:32px 28px;text-align:center;">
          
          <div style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:0.3px;">
            👩‍🚀 Team Invitation
          </div>
          <div style="font-family:SFMono-Regular,Menlo,Consolas,monospace;color:#7dd3fc;font-size:12px;line-height:18px;margin-top:6px;">
            system: <span style="color:#4ade80;">team.invite()</span> — status: <span style="color:#fde68a;">awaiting confirmation</span>
          </div>

          <div style="margin:24px auto 28px;max-width:460px;color:#c7d2fe;font-size:15px;line-height:22px;">
            You have been selected to join the crew of <strong style="color:#22d3ee;">${teamName}</strong>  
            for the <strong style="color:#a78bfa;">${competitionName}</strong> mission.  
            Confirm your participation and prepare for launch.
          </div>

          <a href="${inviteUrl}"
             style="display:inline-block;text-decoration:none;background:linear-gradient(90deg,#0ea5e9,#7c3aed);
                    color:#ffffff;padding:14px 24px;border-radius:12px;font-weight:800;font-size:15px;
                    box-shadow:0 8px 24px rgba(14,165,233,.35),inset 0 0 12px rgba(255,255,255,.12);">
            JOIN CREW
          </a>

          <div style="margin-top:18px;color:#94a3b8;font-size:13px;line-height:20px;">
            This access link remains active for <strong>72 hours</strong>.<br>
            If you already have an AEROO ID — sign in to confirm.<br>
            New recruits will be automatically registered to the mission crew.
          </div>

          <hr style="border:none;height:1px;background:linear-gradient(90deg,transparent,#334155,transparent);margin:28px 0;">
          <div style="font-size:12px;line-height:18px;color:#64748b;">
            If this message was unexpected, simply ignore it.<br>
            © AEROO — Space Education & STEM Competitions  
            <br>From the Co-Founders — <strong style="color:#cbd5e1;">Miras Nussupov</strong> & <strong style="color:#cbd5e1;">Ryspay Alikhan</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-team-invite function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
