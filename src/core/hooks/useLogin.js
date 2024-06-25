import { useAuth } from '../auth/hooks/useAuth';


const useLogin = async (form) => {
    const { login } = useAuth();

    try {
        const isLogin = await login(form);
        if (!isLogin) console.log('Email o password incorrectos')
    } catch (error) {
        console.log('Login-handleForm', error)
    }

}

export default useLogin