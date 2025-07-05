import { JSX } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { DASHBOARD_PATH, LOGIN_PATH } from "../constants/PathConstants";

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated) return <Navigate to={LOGIN_PATH} />;
    if (!isAdmin) return <Navigate to={DASHBOARD_PATH} />;

    return children;
};