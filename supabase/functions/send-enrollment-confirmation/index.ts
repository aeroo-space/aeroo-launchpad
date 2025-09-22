import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EnrollmentConfirmationRequest {
  captainEmail: string;
  captainName: string;
  teamName: string;
  competitionTitle: string;
  participants: Array<{
    name: string;
    role: string;
  }>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      captainEmail, 
      captainName, 
      teamName, 
      competitionTitle, 
      participants 
    }: EnrollmentConfirmationRequest = await req.json();

    console.log("Sending enrollment confirmation to:", captainEmail);

    // Generate participant list HTML
    const participantsList = participants
      .map(p => `<li style="margin-bottom: 8px;"><strong>${p.name}</strong> - ${p.role}</li>`)
      .join("");

    const emailResponse = await resend.emails.send({
      from: "AEROO <info@aeroo.space>",
      to: [captainEmail],
      subject: `Регистрация команды "${teamName}" подтверждена`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a1a; font-size: 28px; font-weight: bold; margin: 0;">AEROO</h1>
            <p style="color: #666666; font-size: 16px; margin: 8px 0 0 0;">Космические технологии и образование</p>
          </div>
          
          <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
            <h2 style="color: #1a1a1a; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">✅ Регистрация подтверждена</h2>
            <p style="color: #374151; font-size: 16px; margin: 0; line-height: 1.5;">
              Здравствуйте, ${captainName}! Ваша команда успешно зарегистрирована на соревнование.
            </p>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #1a1a1a; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Детали регистрации:</h3>
            
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
              <div style="margin-bottom: 16px;">
                <strong style="color: #374151;">Соревнование:</strong>
                <span style="color: #1f2937; margin-left: 8px;">${competitionTitle}</span>
              </div>
              
              <div style="margin-bottom: 16px;">
                <strong style="color: #374151;">Название команды:</strong>
                <span style="color: #1f2937; margin-left: 8px;">${teamName}</span>
              </div>
              
              <div style="margin-bottom: 16px;">
                <strong style="color: #374151;">Капитан команды:</strong>
                <span style="color: #1f2937; margin-left: 8px;">${captainName}</span>
              </div>
              
              <div>
                <strong style="color: #374151;">Участники команды:</strong>
                <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #1f2937;">
                  ${participantsList}
                </ul>
              </div>
            </div>
          </div>

          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin-bottom: 30px;">
            <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.5;">
              <strong>Важно:</strong> Сохраните это письмо как подтверждение регистрации. Дополнительная информация о соревновании будет отправлена позже.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">
              С уважением,<br>
              Команда AEROO
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Если у вас есть вопросы, напишите нам на 
              <a href="mailto:info@aeroo.space" style="color: #3b82f6; text-decoration: none;">info@aeroo.space</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-enrollment-confirmation function:", error);
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