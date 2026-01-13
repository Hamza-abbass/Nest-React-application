import { BrowserRouter, Navigate, replace, Route, Routes } from "react-router-dom";
import OtpPopup from "../PopUp/OtpPopUp";
import PopUpOtp from "../PopUp/PopUpOtp";
import SuperAdminDashboard from "../SuperAdminDashboard/SuperAdminDashboard";
import Login from "../Login/Login";
import UserAdminDashboard from "../UserAdminDashboard/UserAdminDashboard";
import UserAdminLogin from "../UserAdminLogin/UserAdminLogin";
import ProtectedRoute from "../protectedRoute";
import LogoutPopup from "../PopUp/LogoutPopUp";
import SignUp from "../SignUp/SignUp";
import RouteProtected from "../Routeprotected";
import RouteProtection from "../RouteProtection";
import BrowserForwardBack from "../BrowserForwardBack";

const AppRoutes = () => {
    return (
        <BrowserRouter>
        {/* <BrowserForwardBack/> */}
            <Routes>
                <Route path="/" element={<Navigate replace to='/login'></Navigate>}></Route>
                <Route path="/userAdmin" element={<UserAdminLogin />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/superadmindashboard" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>}></Route>
                <Route path="/userdashboard" element={<ProtectedRoute><UserAdminDashboard /></ProtectedRoute>}></Route>
                <Route path="/OtpPopUp" element={<RouteProtected><OtpPopup /></RouteProtected>}></Route>
                <Route path='/LogoutPopUp' element={<ProtectedRoute><LogoutPopup /></ProtectedRoute>}></Route>
                <Route path='/SignUp' element={<SignUp />}></Route>
                <Route path="/popUpotp" element={<RouteProtection><PopUpOtp /></RouteProtection>}></Route>
            </Routes>
        </BrowserRouter>
    )

}
export default AppRoutes;