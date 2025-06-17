import { JSX } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!isAdmin) return <Navigate to="/" />;

    return children;
};