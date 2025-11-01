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

    // Use the configured app URL from environment variable
    const baseUrl = Deno.env.get("APP_URL") || 'https://pigoiwdkwdrrodftbkkm.aeroo.space';
    const inviteUrl = `${baseUrl}/auth?invite=${token}`;
    
    console.log("Invite URL:", inviteUrl);

    const emailResponse = await resend.emails.send({
      from: "AEROO <noreply@aeroo.space>",
      to: [inviteeEmail],
      subject: `Приглашение в команду ${teamName} - ${competitionId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Приглашение в команду AEROO</h1>
          <p>Вы приглашены присоединиться к команде <strong>${teamName}</strong> для участия в соревновании <strong>${competitionId}</strong>!</p>
          
          <div style="margin: 30px 0;">
            <a href="${inviteUrl}" 
               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Перейти к регистрации
            </a>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Как принять приглашение:</h3>
            <ol style="color: #666; line-height: 1.6;">
              <li><strong>Если у вас нет аккаунта:</strong> Нажмите на кнопку выше и пройдите регистрацию на платформе AEROO</li>
              <li><strong>Если у вас уже есть аккаунт:</strong> Нажмите на кнопку выше и войдите в свой аккаунт</li>
              <li>После входа вы увидите приглашение в своем личном кабинете</li>
              <li>Нажмите "Принять" чтобы присоединиться к команде</li>
            </ol>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            <strong>Важно:</strong> Это приглашение действительно в течение 72 часов.
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
