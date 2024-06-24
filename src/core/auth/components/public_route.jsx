import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const PublicRoute = ({ children }) => {
    
    const { isLoggedIn } = useAuth();

    if ( !isLoggedIn ) return children;
    
    return <Navigate to={ '/productos' } />;
}

export default PublicRoute;