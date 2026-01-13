import React, { useContext, useEffect, useState } from "react";
import './Login.css';
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

import { useLocation, useNavigate } from "react-router-dom";
import apiFetch from "../middleware/apiFetch";
import { UserContext } from "../context/UserContext";




const SuperAdminLogin = () => {
    const [loginType, setLoginType] = useState("superadmin");
    const [response, setResponse] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setRole } = useContext(UserContext);
    const location = useLocation();

    // useEffect(() => {
    //     const handler = () => {
    //         if (location.state.loginFlag) {
    //             window.history.pushState(null, document.title, window.location.href)
    //         }

    //     }
    //     window.addEventListener('popstate', handler)
    // },[location]);









    const navigate = useNavigate();
    const navigationButton = () => {
        navigate('/SignUp')

    }
    const handleOnclick = async (formValues) => {
        const url =
            loginType === "superadmin"
                ? "http://localhost:3000/auth/login/superAdmin"
                : "http://localhost:3000/auth/login/admin-user";

        const response = await apiFetch(url, {
            method: 'POST',
            body: {
                email: formValues.email,
                password: formValues.password
            }
        });




        const data = await response.json();
        const role = data.role;

        setRole(role);
        const OtpsessionId = data.otpSessionId;
        const id = data.id;
        Cookies.set('Id', id);
        Cookies.set('OtpsessionId', OtpsessionId);
        if (response.ok) {
            navigate('/OtpPopUp', { replace: true })
        } else {
            const message = data.message;
            setResponse(message);
            navigate('/login')
        }
    }
    return (
        <div className="main_container">
            <div className="container">
                <div className="login-switch">
                    <button
                        className={loginType === "superadmin" ? "active" : ""}
                        onClick={() => setLoginType("superadmin")}
                    >
                        Super Admin Login
                    </button>

                    <button
                        className={loginType === "user" ? "active" : ""}
                        onClick={() => setLoginType("user")}
                    >
                        User / Admin Login
                    </button>
                </div>
                <div className="heading">
                    <h1>
                        {loginType === "superadmin"
                            ? "Super Admin Login"
                            : "User / Admin Login"}
                    </h1>
                </div>
                <form onSubmit={handleSubmit(handleOnclick)}>
                    <div className="inputs">
                        <h2>Email</h2>
                        <input type="text" placeholder="Email" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid Email' } })}></input>
                        {errors.email && (<p style={{ color: "red" }}>{errors.email.message} </p>)}
                    </div>
                    <div className="inputs">
                        <h2>Password</h2>
                        <input type="password" placeholder="password" {...register('password', { required: 'Password is required', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Enter a valid Password' } })}></input>
                        {errors.password && (<p style={{ color: "red" }}>{errors.password.message} </p>)}

                        <div className="response-box">
                            <span>{response}</span>
                        </div>
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="footer-text">
                    Dont have any Account?
                    <span onClick={navigationButton} >Signup</span>
                </p>

            </div>
        </div>

    );
};

export default SuperAdminLogin;
