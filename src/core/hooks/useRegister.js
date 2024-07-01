
export const useRegister = () => {

    const ERROR = 'error';
    const SUCCESSFUL = 'successful';

    const registerNewUser = async (form) => {
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
                let res = await fetch('https://proyecto-backend-gestion-de-venta.onrender.com/api/usuarios/Register', config);
                let json = await res.json();

                if (json.usuario) {
                    return { text: json.message, type: SUCCESSFUL };
                } else {
                    return { text: json.message, type: ERROR };
                }
            } else {
                return { text: 'Password incorrecto.', type: ERROR };
            }

        } catch (error) {
            console.log('useRegister-registerNewUser', error);
        }
    }

    return { registerNewUser };
};