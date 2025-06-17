import { createContext } from "react";


type AuthContextType = {
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (token: string, isAdmin: boolean) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);