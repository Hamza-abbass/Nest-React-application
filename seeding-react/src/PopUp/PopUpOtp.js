import { useEffect, useState } from 'react'
import './PopUpOtp.css'
import Cookies from 'js-cookie';
import { replace, useLocation, useNavigate } from 'react-router-dom';

import apiFetch from "../middleware/apiFetch";
const PopUpOtp = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const location = useLocation();



    // console.log(location.state?.popupFlag);


    // useEffect(() => {

    //     window.history.pushState(null, document.title, window.location.href);
    //     const handler = () => {


    //         console.log(location.state.popupFlag);

    //         if (location.state.popupFlag == true) {
    //             // console.log('hiiii');



    //             window.history.pushState(null, document.title, window.location.href);
    //         }
    //     }
    //     window.addEventListener('popstate', handler);

    // });







    //   useEffect(() => {
    //     if (location.state.popupFlag) {
    //         window.history.pushState(null, document.title, window.location.href);
    //         window.addEventListener('popstate', () => {
    //             console.log('hi');

    //             if (location.state.popupFlag) {
    //                 window.history.pushState(null, document.title, window.location.href)
    //             }


    //         });
    //     }
    // },[location.state]);

    const SubmitButton = async () => {
        const user_id = Cookies.get('user_ID');
        const response = await apiFetch('http://localhost:3000/auth/varify', {
            method: 'POST',
            body: { otp: otp, id: user_id }
        });
        const data = await response.json();
        // console.log(data.message);
        


        if (response.ok) {
            navigate('/login', { replace: true })
        } else {
            navigate('/popUpotp');
            setMessage(data.message)

            

        }

    }

    const ResendEmail = async () => {
        const user_id = Cookies.get('user_ID');
        const response = await apiFetch('http://localhost:3000/auth/resendEmail', {
            method: 'POST',
            body: { id: user_id }

        });
        const data = await response.text();
        setMessage(data)
    }
    const ChangeOtp = (e) => {
        setOtp(e.target.value);
    }
    return (
        <div className="otp-overlay">
            <div className="otp-card">

                <h2>Verify OTP</h2>
                <p className="otp-subtitle">Enter the 6-digit code sent to your email</p>
                <div className="otp-field">
                    <label>OTP Code</label>
                    <input type="text" value={otp} onChange={ChangeOtp} placeholder="Enter OTP" maxlength="6" />
                </div>
                <button className="otp-btn" onClick={SubmitButton}>Verify</button>
                <button className="resend-otp" onClick={ResendEmail}>Resend Otp</button>
                <span>{message}</span>

            </div>
        </div>

    )

}
export default PopUpOtp;