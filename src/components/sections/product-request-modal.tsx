import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type ProductOption = { id: string; title: string };

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: ProductOption[];
  selectedProductId: string | null;
  onSubmitted?: () => void;
}

export function ProductRequestModal({ open, onOpenChange, products, selectedProductId, onSubmitted }: Props) {
  const [productId, setProductId] = useState<string>(selectedProductId ?? products[0]?.id ?? "");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (selectedProductId) setProductId(selectedProductId);
  }, [selectedProductId]);

  function reset() {
    setName("");
    setOrg("");
    setEmail("");
    setComment("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Отправка в Supabase (таблица leads/requests). Сейчас — заглушка UI.
    onSubmitted?.();
    onOpenChange(false);
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Оставить заявку</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product">Выберите набор</Label>
            <select
              id="product"
              className="w-full px-3 py-2 rounded-md bg-input text-foreground border border-border"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org">Организация / школа</Label>
              <Input id="org" value={org} onChange={(e) => setOrg(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий</Label>
            <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Кратко опишите задачу и сроки" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit" className="btn-cosmic">
              Отправить
            </Button>
          </div>
        </form>

        {/* Примечание: для реальной отправки подключите Supabase и сохраняйте заявку в БД. */}
      </DialogContent>
    </Dialog>
  );
}
