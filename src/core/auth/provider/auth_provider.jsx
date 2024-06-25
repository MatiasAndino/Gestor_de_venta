import { useEffect, useState } from "react";
import { AuthContext } from "../context/auth_context";
import { jwtDecode } from "jwt-decode";
import AlertaError from "../../components/alerts/alerta_error";

export const AuthProvider = ({ children }) => {

    const TOKEN_KEY = "Authorization";

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tokenData, setTokenData] = useState({
        'Authorization': '',
        nombre: '',
        rol: ''
    });

    const [isNull, setIsNull] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);

        if (token) {
            const datos = jwtDecode(token);
            setTokenData(datos);
            setIsLoggedIn(true);
        }
    }, []);

    const login = async (form) => {
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }

            let res = await fetch('http://localhost:3000/api/usuarios/login', config);
            let { token } = await res.json();

            if (token) {
                const { nombre, rol } = jwtDecode(token);

                setTokenData({
                    'Authorization': token,
                    nombre,
                    rol,
                })

                Object.keys(tokenData).forEach(key => {
                    localStorage.setItem(key, tokenData[key])
                });
                setIsLoggedIn(true);
            } else {
                setIsNull(true)
                setTimeout(() => {
                    setIsNull(false)
                },4000);
            }
        } catch (error) {
            console.log('AuthProvider-login', error);
        }
    };

    const logout = async () => {

        try {
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) {
                Object.keys(datos).forEach(key => {
                    localStorage.removeItem(key)
                });
            }

            setIsLoggedIn(false);
        } catch (error) {
            console.log('AuthProvider-logout', error)
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            { isNull && <AlertaError mensaje="Email o password incorrectos." /> }
            { children }
        </AuthContext.Provider>
    )
}