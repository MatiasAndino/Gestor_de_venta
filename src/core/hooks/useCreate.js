
export const useCreate = () => {


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

            let message = {
                errorPassword: false,
                errorUsuario: false,
                successful: false,
            };

            if (form.password === form.confirmar_password) {
                let res = await fetch('http://localhost:3000/api/usuarios/Register', config);
                let json = await res.json();

                if (json.usuario) {
                    message = {
                        ...message,
                        successful: true
                    }
                } else {
                    message = {
                        ...message,
                        errorUsuario: true
                    }
                }
            } else {
                message = {
                    ...message,
                    errorPassword: true
                }
            }

            return message;
        } catch (error) {
            console.log('useCreate', error);
        }
    }

    return { create };
};