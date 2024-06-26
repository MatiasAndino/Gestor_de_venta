import { useState } from "react";

export const useCreate = () => {

    const [message, setMessage] = useState({
        errorPassword: false,
        errorUsuario: false,
        successful: false,
    })


    const create = async (form) => {
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }

            if (form.password === form.confirmar_password) {
                let res = await fetch('http://localhost:3000/api/usuarios/Register', config);
                let json = await res.json();

                if (json.usuario) {
                    setMessage({
                        ...message,
                        successful: true
                    })
                } else {
                    setMessage({
                        ...message,
                        errorUsuario: true
                    })
                }
            } else {
                setMessage({
                    ...message,
                    errorPassword: true
                })
            }

            return message;
        } catch (error) {
            console.log('useCreate', error);
        }
    }

    return { create };
};