import { useState } from "react";
import {  useNavigate } from "react-router-dom";

const UserAdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response,setResponse] = useState('');
    const navigate = useNavigate();
    

    console.log(response);
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handlelogin =async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/login/admin-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            });
            setEmail('');
            setPassword('');
            const data = await  response.text();
            setResponse(data);
            // if(response.ok){
            //     navigate('/DashboardA')
            // }else{
            //     navigate('/UserAdmin')
            // }
            




        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="main_container">
            <div className="container">
                <div className="heading">
                    <h1>User Admin Login</h1>
                </div>
                <div className="inputs">
                    <h2>Email</h2>
                    <input type="text" placeholder="Email" value={email} onChange={handleOnChangeEmail}></input>
                </div>
                <div className="inputs">
                    <h2>Password</h2>
                    <input type="password" placeholder="password" value={password} onChange={handleOnChangePassword}></input>
                </div>
                <div className="response-box">
                        <span>{response}</span>
                    </div>
                <button onClick={handlelogin}>Login</button>
            </div>
        </div>
    );

};
export default UserAdminLogin;

