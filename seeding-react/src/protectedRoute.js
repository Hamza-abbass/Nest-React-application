import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie'

const ProtectedRoute = ({ children }) => {
    const sessionId = Cookies.get('sessionId');
    
    if (!sessionId) {
        return <Navigate to='/login'></Navigate>
    }
    
    return children;
    




}
export default ProtectedRoute;