import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { changePasswordCall, getMustChangePassword, getUsername, isAdminUser, isLoggedIn, LoginResponse, loginUser, logoutUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { MANDATORY_CHANGE_PASSWORD_PATH } from "../constants/PathConstants";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState(isLoggedIn());
    const [username, setUsername] = useState<string | null>(getUsername());
    const [isAdmin, setIsAdmin] = useState(isAdminUser());
    const [mustChangePassword, setMustChangePassword] = useState(getMustChangePassword());

    const navigate = useNavigate();

    useEffect(() => {
        setAuthenticated(isLoggedIn());
        setIsAdmin(isAdminUser());
        setUsername(getUsername());
    }, []);

    useEffect(() => {
        if (isAuthenticated && mustChangePassword) {
            navigate(MANDATORY_CHANGE_PASSWORD_PATH);
        }
    }, [isAuthenticated, mustChangePassword])

    const login = async (username: string, password: string) => {

        const loginResponse: LoginResponse = await loginUser({ username, password });
        
        setAuthenticated(true);
        setUsername(loginResponse.userInfo.username);
        setIsAdmin(loginResponse.userInfo.isAdmin);
        setMustChangePassword(loginResponse.userInfo.mustChangePassword)
    };

    const changePassword = async (newPassword: string) => {
        await changePasswordCall({ newPassword });
        setMustChangePassword(false);
    }

    const logout = () => {
        logoutUser();
        setAuthenticated(false);
        setIsAdmin(false);
        setUsername(null);
        setMustChangePassword(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, username, login, changePassword, logout }}>
            { children }
        </AuthContext.Provider>
    );
};