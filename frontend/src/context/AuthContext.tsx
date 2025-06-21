import { createContext } from "react";


type AuthContextType = {
    isAuthenticated: boolean;
    isAdmin: boolean;
    username: string | null;
    login: (username: string, password: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);