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

    const inviteUrl = `${Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '.aeroo.space') || 'https://aeroo.space'}/auth?invite=${token}`;

    const emailResponse = await resend.emails.send({
      from: "AEROO <noreply@aeroo.space>",
      to: [inviteeEmail],
      subject: `Приглашение в команду ${teamName} - ${competitionId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Приглашение в команду</h1>
          <p>Вы приглашены присоединиться к команде <strong>${teamName}</strong> для участия в соревновании <strong>${competitionId}</strong>!</p>
          
          <div style="margin: 30px 0;">
            <a href="${inviteUrl}" 
               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Принять приглашение
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Это приглашение действительно в течение 72 часов.<br>
            Если у вас уже есть аккаунт, войдите, чтобы принять приглашение.<br>
            Если вы новый пользователь, зарегистрируйтесь, и вы автоматически присоединитесь к команде.
          </p>
          
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            Если вы не ожидали это приглашение, просто проигнорируйте это письмо.
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
