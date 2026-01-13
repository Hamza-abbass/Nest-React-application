import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const RouteProtected = ({children}) => {

    const OtpsessionId = Cookies.get('OtpsessionId')

    if (!OtpsessionId) {
        return (<Navigate to='/login'></Navigate>)
    }
    return children;

}
export default RouteProtected;