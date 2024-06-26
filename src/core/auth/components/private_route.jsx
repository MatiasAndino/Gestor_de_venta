import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    
    const { isLoggedIn } = useAuth();

    if ( isLoggedIn ) return children;
    
    return <Navigate to={ '/' } />;
}

export default PrivateRoute;