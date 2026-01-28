import { useState } from 'react';
import './SignUp.css'
import apiFetch from '../middleware/apiFetch';
import { replace, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useForm } from "react-hook-form";


const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password');
    const navigate = useNavigate();
    const [ErrorMessage, setErrorMessage] = useState('');
    const [Message, setMessage] = useState('');
    const navigationButton = () => {
        navigate('/login')
    }
    const onSubmit = async (formValues) => {
        const response = await apiFetch('http://localhost:3000/auth/register', {
            method: 'POST',
            body: {
                username: formValues.username,
                email: formValues.email,
                password: formValues.password,
                confirmPassword: formValues.confirmPassword
            }

        });
        const data = await response.json();
        // console.log(data);



        // console.log(data.result);

        const message = data.message;
        // console.log(message);



        if (message == 'Verification screen again') {
            const user_id = data.id;
            Cookies.set('user_ID', user_id)
            navigate('/popUpotp')

        } else if (message == 'User is created') {
            const user_id = data.result.id;
            Cookies.set('user_ID', user_id);
            navigate('/popUpotp')

        } else if (message == 'Email is already in use') {
            setMessage(message);

            navigate('/SignUp');


        }
        // if (response.ok) {
        //     navigate('/popUpotp', { replace: true })
        // } else {
        //     navigate('/SignUp')

        // }

    }



    return (

        <div className="signup-wrapper">
            <div className="signup-card">
                <h2>Create Account</h2>
                <p className="subtitle">Sign up to get started</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label>Username</label>
                        <input type="text" placeholder="Enter username" {...register("username", { required: "Username is required", minLength: { value: 5, message: "Username must be at least 5 characters" }, maxLength: { value: 12, message: "Username must not exceed 12 characters" }, pattern: { value: /^[a-zA-Z]*$/, message: "Username must contain only letters" } })} />
                        {errors.username && (<p style={{ color: "red" }}>{errors.username.message} </p>)}
                    </div>


                    <div className="field">
                        <label>Email</label>
                        <input type="email" placeholder="Enter email"  {...register("email", { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid Email' } })} />
                        {errors.email && (<p style={{ color: "red" }}>{errors.email.message} </p>)}
                    </div>

                    <div className="field">
                        <label>Password</label>
                        <input type="password" placeholder="Enter password" {...register('password', { required: 'Password is required', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Minimum 8 characters in length at least one lowercase letter at least one uppercase letter at least one digit at least one special character no whitespace ' } })} />
                        {errors.password && (<p style={{ color: "red" }}>{errors.password.message} </p>)}
                    </div>

                    <div className="field">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm password" {...register('confirmPassword', { required: 'Confirm Password is required', validate: (value) => value === password || "Passwords do not match" })} />
                        {errors.confirmPassword && (<p style={{ color: "red" }}>{errors.confirmPassword.message} </p>)}
                    </div>
                    <button className="signup-btn" type="submit">
                        Sign Up
                    </button>
                    <span >{Message}</span>

                    <p className="footer-text">
                        Already have an account?
                        <span onClick={navigationButton}>Login</span>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default SignUp;