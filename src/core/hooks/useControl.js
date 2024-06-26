import { useAuth } from "../auth/hooks/useAuth";

const useControl = () => {
    const TOKEN_VENCIDO = 401;
    const { logout } = useAuth()

    const controlToken = (status) => {
        if (status === TOKEN_VENCIDO) {
            logout();
        }
    }

    return { controlToken }
}

export default useControl