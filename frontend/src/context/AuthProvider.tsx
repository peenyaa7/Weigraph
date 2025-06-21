import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUsername, isAdminUser, isLoggedIn, LoginResponse, loginUser, logoutUser } from "../api/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState(isLoggedIn());
    const [username, setUsername] = useState<string | null>(getUsername());
    const [isAdmin, setIsAdmin] = useState(isAdminUser());

    useEffect(() => {
        setAuthenticated(isLoggedIn());
        setIsAdmin(isAdminUser());
        setUsername(getUsername());
    }, []);

    const login = async (username: string, password: string) => {

        
        const loginResponse: LoginResponse = await loginUser({ username, password });
        
        setAuthenticated(true);
        setUsername(loginResponse.userInfo.username);
        setIsAdmin(loginResponse.userInfo.isAdmin);
    };

    const logout = () => {
        logoutUser();
        setAuthenticated(false);
        setIsAdmin(false);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, username, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
};