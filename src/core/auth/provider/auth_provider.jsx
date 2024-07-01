import { useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/auth_context";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../constants/constants";
import AdministradorAlertas from "../../components/alerts/administrador_alertas";

export const AuthProvider = ({ children }) => {

    const TOKEN_KEY = "Authorization";

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tokenData, setTokenData] = useState({
        'Authorization': '',
        nombre: '',
        rol: ''
    });

    const typeMessage = {
        error: 'error',
        successful: 'successful'
    }

    const administradorAlertasRef = useRef();

    function mostrarAlerta(text, type) {
        administradorAlertasRef.current.showMessage(text, type);
    }

    const jwTokenDecode = (token) => {
        const { nombre, rol } = jwtDecode(token);

        const datos = ({
            'Authorization': token,
            nombre,
            rol,
        })

        return datos;
    }

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);

        if (token) {

            const datos = jwTokenDecode(token)
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

            let res = await fetch(`${API_URL}/api/usuarios/login`, config);
            let json = await res.json();


            if (json.token) {
                const datos = jwTokenDecode(json.token);

                Object.keys(datos).forEach(key => {
                    localStorage.setItem(key, datos[key])
                });

                setIsLoggedIn(true);
                setTokenData(datos);
                mostrarAlerta(json.message, typeMessage.successful);
            } else {
                mostrarAlerta(json.message, typeMessage.error);
            }
        } catch (error) {
            console.log('AuthProvider-login', error);
        }
    };

    const logout = async () => {

        try {
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) {
                Object.keys(tokenData).forEach(key => {
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
            <AdministradorAlertas ref={administradorAlertasRef} />
            {children}
        </AuthContext.Provider>
    )
}