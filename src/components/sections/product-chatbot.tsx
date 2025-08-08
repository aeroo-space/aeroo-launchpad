import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Bot, Send, User as UserIcon } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatBotPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Здравствуйте! Я бот AEROO. Подскажу по наборам и соревнованиям. Спросите, например: ‘Какой набор для новичка?’ или ‘Когда ближайшее соревнование?’",
    },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");

    // show user message
    setMessages((m) => [...m, { role: "user", content: text }]);

    // Placeholder assistant reply. Replace with Supabase Edge Function -> OpenAI call.
    const reply = getLocalAnswer(text);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    }, 300);
  }

  function getLocalAnswer(q: string): string {
    const ql = q.toLowerCase();
    if (ql.includes("нович")) {
      return "Для старта рекомендуем набор AEROO-R1 (ракетомоделирование). Он безопасный и идёт с видеокурсом.";
    }
    if (ql.includes("дрон") || ql.includes("квадрок")) {
      return "Для изучения дронов обратите внимание на AEROO-D2: FPV-камера, программируемый контроллер и симулятор полёта.";
    }
    if (ql.includes("спутн")) {
      return "Набор AEROO-S3 подойдёт для проектной работы: солнечные панели, радиосистема и бортовой компьютер.";
    }
    if (ql.includes("соревнован") || ql.includes("чемпионат") || ql.includes("фест")) {
      return "Актуальные соревнования AEROO публикуем в разделе ‘Соревнования’. Могу подсказать по формату и требованиям, задайте уточняющий вопрос.";
    }
    return "Я могу помочь выбрать набор или рассказать о соревнованиях AEROO. Уточните ваш уровень и цель обучения.";
  }

  return (
    <article className="glass-card rounded-xl border border-border/50">
      <header className="px-4 py-3 border-b border-border/50 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold">Чат с AEROO</h3>
      </header>

      <div ref={listRef} className="px-4 py-4 h-80 overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}> 
            <div
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground border border-border/50"
              )}
            >
              <p>{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-border/50 flex gap-2">
        <Input
          aria-label="Сообщение для бота AEROO"
          placeholder="Напишите сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" className="btn-cosmic" aria-label="Отправить">
          <Send className="w-4 h-4" />
        </Button>
      </form>

      {/* Примечание: подключите Supabase и OpenAI для реальных ответов */}
    </article>
  );
}
