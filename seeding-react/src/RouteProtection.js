import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const RouteProtection = ({ children }) => {
    const user_id = Cookies.get('user_ID');
    if (!user_id) {
        return (<Navigate to='/signUp'></Navigate>)

    }
    return children;



}
export default RouteProtection;