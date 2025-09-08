import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthProvider";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Loader2, Mail, Building, MessageSquare, Calendar, Package, User } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ProductRequest {
  id: string;
  user_id: string | null;
  product_id: string;
  name: string;
  email: string;
  organization: string | null;
  comment: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const statusOptions = [
  { value: 'pending', label: 'Ожидает', color: 'bg-yellow-500' },
  { value: 'processing', label: 'В обработке', color: 'bg-blue-500' },
  { value: 'completed', label: 'Выполнено', color: 'bg-green-500' },
  { value: 'cancelled', label: 'Отменено', color: 'bg-red-500' }
];

const productNames: Record<string, string> = {
  'rocket-kit': 'Rocket Science Kit',
  'cansat-kit': 'CanSat Kit',
  'space-kit': 'Space Exploration Kit',
  'mars-kit': 'Mars Mission Kit'
};

export default function ProductRequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ProductRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Заявки на продукты — AEROO";
    const metaDesc = (document.querySelector('meta[name="description"]') as HTMLMetaElement) || (() => {
      const m = document.createElement("meta");
      m.name = "description";
      document.head.appendChild(m);
      return m;
    })();
    metaDesc.content = "Управление заявками на образовательные наборы AEROO";
    
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.origin + "/product-requests";
  }, []);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("product_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast("Ошибка загрузки", { 
        description: "Не удалось загрузить заявки" 
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (requestId: string, newStatus: string) => {
    try {
      setUpdating(requestId);
      const { error } = await supabase
        .from("product_requests")
        .update({ status: newStatus })
        .eq("id", requestId);

      if (error) throw error;

      setRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: newStatus } : req
      ));

      toast("Статус обновлен", { 
        description: "Статус заявки успешно изменен" 
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast("Ошибка обновления", { 
        description: "Не удалось обновить статус заявки" 
      });
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status);
    return (
      <Badge variant="secondary" className={`${option?.color} text-white`}>
        {option?.label || status}
      </Badge>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-cosmic">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-8">
              <p>Доступ к этой странице требует авторизации</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cosmic">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Заявки на продукты
            </h1>
            <p className="text-white/70">
              Управление заявками на образовательные наборы
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          ) : (
            <div className="space-y-6">
              {requests.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Заявок пока нет</h3>
                    <p className="text-muted-foreground">
                      Когда пользователи оставят заявки на продукты, они появятся здесь
                    </p>
                  </CardContent>
                </Card>
              ) : (
                requests.map((request) => (
                  <Card key={request.id} className="glass-card">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-white mb-2">
                            {productNames[request.product_id] || request.product_id}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-white/70 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(request.created_at), "d MMMM yyyy, HH:mm", { locale: ru })}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              ID: {request.id.slice(0, 8)}...
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(request.status)}
                          <Select
                            value={request.status}
                            onValueChange={(value) => updateStatus(request.id, value)}
                            disabled={updating === request.id}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-white">
                            <User className="h-4 w-4 text-white/70" />
                            <span className="font-medium">{request.name}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-white">
                            <Mail className="h-4 w-4 text-white/70" />
                            <a 
                              href={`mailto:${request.email}`}
                              className="text-blue-300 hover:text-blue-200 underline"
                            >
                              {request.email}
                            </a>
                          </div>
                          
                          {request.organization && (
                            <div className="flex items-center gap-2 text-white">
                              <Building className="h-4 w-4 text-white/70" />
                              <span>{request.organization}</span>
                            </div>
                          )}
                        </div>
                        
                        {request.comment && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-white/70">
                              <MessageSquare className="h-4 w-4" />
                              <span className="text-sm font-medium">Комментарий:</span>
                            </div>
                            <div className="text-white bg-white/5 rounded-lg p-3 text-sm">
                              {request.comment}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}