import { useState } from "react";
import { AuthContext } from "../context/auth_context";


export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (form) => {
    };

    const logout = async () => {

    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}