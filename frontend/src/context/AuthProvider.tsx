import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token) {
            setAuthenticated(true);
            setIsAdmin(role === "ADMIN");
        }
    }, []);

    const login = (token: string, isAdmin: boolean) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", isAdmin ? "ADMIN" : "USER");
        setAuthenticated(true);
        setIsAdmin(isAdmin);
    };

    const logout = () => {
        localStorage.clear();
        setAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
};