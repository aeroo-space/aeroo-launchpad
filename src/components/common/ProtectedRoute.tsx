import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { toast } from "@/components/ui/sonner";

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    React.useEffect(() => {
        if (!loading && !user) {
            toast("Требуется авторизация", { description: "Пожалуйста, войдите в аккаунт для доступа." });
        }
    }, [user, loading]);

    if (loading) return null; // Or a spinner/loader
    if (!user) {
        return <Navigate to="/auth" replace state={{ from: location }} />;
    }
    return children;
};

export default ProtectedRoute; 