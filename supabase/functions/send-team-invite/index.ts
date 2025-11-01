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
    'exploring-world-of-science': 'Exploring the World of Science',
    'space-settlement': 'Space Settlement Competition',
    'space-settlement-2025': 'Space Settlement Competition 2025',
    'satellite-launch-2026': 'Satellite Launch Competition 2026',
  };
  
  return competitionNames[competitionId] || competitionId;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { inviteId, teamName, competitionId, inviteeEmail, token }: InviteRequest = await req.json();

    console.log("Sending team invite:", { inviteId, teamName, competitionId, inviteeEmail });

    // Use the configured app URL from environment variable
    const baseUrl = Deno.env.get("APP_URL") || 'https://pigoiwdkwdrrodftbkkm.aeroo.space';
    const inviteUrl = `${baseUrl}/auth?invite=${token}`;
    
    console.log("Invite URL:", inviteUrl);

    const competitionName = formatCompetitionName(competitionId);

    const emailResponse = await resend.emails.send({
      from: "AEROO <noreply@aeroo.space>",
      to: [inviteeEmail],
      subject: `Team Invitation: ${teamName} - ${competitionName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Team Invitation</h1>
          <p>You are invited to join team <strong>${teamName}</strong> to participate in <strong>${competitionName}</strong>!</p>
          
          <div style="margin: 30px 0;">
            <a href="${inviteUrl}" 
               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Accept Invitation
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            This invitation is valid for 72 hours.<br>
            If you already have an account, sign in to accept the invitation.<br>
            If you are a new user, register and you will automatically join the team.
          </p>
          
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            If you were not expecting this invitation, simply ignore this email.
          </p>
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
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
