import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Rocket } from "lucide-react";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enrollmentId: string;
  userId: string;
}

export const FeedbackDialog = ({ open, onOpenChange, enrollmentId, userId }: FeedbackDialogProps) => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
  });

  const questions = [
    t('feedback.question1', { defaultValue: 'Какие новые знания и навыки ты получил(а) во время участия в соревновании?' }),
    t('feedback.question2', { defaultValue: 'Использовал(а) ли ты искусственный интеллект, 3D-моделирование, программирование или симуляции в процессе работы над проектом? Если да — расскажи, как именно.' }),
    t('feedback.question3', { defaultValue: 'Какой момент запомнился тебе больше всего во время хакатона?' }),
    t('feedback.question4', { defaultValue: 'Если бы ты мог(ла) описать AEROO Space Settlement Competition 2025 одним словом — каким бы оно было?' }),
    t('feedback.question5', { defaultValue: 'Что, по твоему мнению, можно улучшить со стороны организаторов (платформа, обучающие материалы, правила, категории и т.д.)?' }),
    t('feedback.question6', { defaultValue: 'Опишите ваш проект одним предложением — что вы создали и почему это важно?' }),
    t('feedback.question7', { defaultValue: 'Какой совет вы бы дали команде, которая участвует в AEROO в следующем году?' }),
    t('feedback.question8', { defaultValue: 'Какие технологии или инструменты вы использовали в проекте? (например: Blender, Python, ChatGPT, Unity)' }),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (Object.values(answers).some(answer => !answer.trim())) {
      toast.error(t('feedback.fillAllFields', { defaultValue: 'Пожалуйста, заполните все поля' }));
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("feedback")
        .insert({
          user_id: userId,
          enrollment_id: enrollmentId,
          ...answers,
        });

      if (error) throw error;

      setSuccess(true);
      toast.success(t('feedback.thankYou', { defaultValue: 'Спасибо за отзыв!' }));
    } catch (error: any) {
      toast.error(t('feedback.error', { defaultValue: 'Ошибка отправки отзыва' }), {
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (success) {
      setAnswers({
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        question6: "",
        question7: "",
        question8: "",
      });
      setSuccess(false);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        {success ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Rocket className="h-16 w-16 text-primary" />
            <DialogTitle className="text-2xl text-center">
              {t('feedback.congratulations', { defaultValue: 'Поздравляем с участием!' })}
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              {t('feedback.successMessage', { defaultValue: 'Спасибо, твой отзыв поможет сделать AEROO ещё лучше!' })}
            </DialogDescription>
            <Button onClick={handleClose}>
              {t('common.close', { defaultValue: 'Закрыть' })}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t('feedback.title', { defaultValue: 'Обратная связь' })}</DialogTitle>
              <DialogDescription>
                {t('feedback.description', { defaultValue: 'Пожалуйста, ответьте на следующие вопросы о вашем опыте участия в AEROO Space Settlement Competition 2025' })}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {questions.map((question, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`question${index + 1}`}>
                    {index + 1}️⃣ {question}
                  </Label>
                  <Textarea
                    id={`question${index + 1}`}
                    value={answers[`question${index + 1}` as keyof typeof answers]}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [`question${index + 1}`]: e.target.value,
                      }))
                    }
                    placeholder={t('feedback.answerPlaceholder', { defaultValue: 'Ваш ответ...' })}
                    rows={4}
                    required
                  />
                </div>
              ))}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleClose}>
                  {t('common.cancel', { defaultValue: 'Отмена' })}
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? t('common.submitting', { defaultValue: 'Отправка...' }) : t('common.submit', { defaultValue: 'Отправить' })}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
