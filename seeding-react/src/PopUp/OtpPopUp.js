import React, { useContext, useEffect, useState } from 'react';
import './OtpPopUp.css';
import apiFetch from '../middleware/apiFetch';
import Cookies from 'js-cookie'
import { useLocation, useNavigate } from 'react-router-dom';
// import SuperAdminDashboard from '../SuperAdminDashboard/SuperAdminDashboard';
import { UserContext } from '../context/UserContext';

const OtpPopup = () => {
  const [message, setMessage] = useState('');
  const [Message, setmessage] = useState('');


  const [validationError, setvalidationError] = useState('');
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const { setUsername } = useContext(UserContext);
  const { role } = useContext(UserContext);
  const location = useLocation();

  // useEffect(() => {
  //   const handler = () => {
  //     if (location.state.OtpFlag) {
  //       window.history.pushState(null, document.title, window.location.href)
  //     }

  //   }

  //   window.addEventListener('popstate', handler)



  // },[location])


  const ResendEmail = async () => {
    const id = Cookies.get('Id');
    const response = await apiFetch('http://localhost:3000/auth/emailResend', {
      method: 'POST',
      body: { id: id }

    });
    const data = await response.text();
    setmessage(data)
  }




  const OnChangeText = (e) => {
    setOtp(e.target.value);
  }

  const buttonSubmit = async () => {
    let isValid = true;

    if (!otp) {
      setvalidationError('Otp is required');
      isValid = false;

    }

    if (isValid == false) {
      return;
    }

    const OtpsessionId = Cookies.get('OtpsessionId');

    const response = await apiFetch('http://localhost:3000/auth/VerifyOTP', {
      method: 'POST',
      body: { Code: otp, otpSessionId: OtpsessionId }


    })
    const data = await response.json();
    // console.log(data);


    setUsername(data.username);
    const sessionId = data.sessionId;
    Cookies.set('sessionId', sessionId);
    if (!response.ok) {
      setMessage(data.message);
      return;


    }
    if (role == 'superAdmin') {
      navigate('/superadmindashboard', { replace: true })
    } else {
      navigate('/userdashboard', { replace: true })
    }

  }

  const CancelClick = () => {
    navigate('/login')

  }







  return (

    <div className="popup-overlay">
      <div className="popup-card">
        <h2>Enter OTP</h2>
        <p>An OTP has been sent to your Email. Please check your inbox.</p>
        <input
          type="text"
          onChange={OnChangeText}
          value={otp}
          placeholder="Enter OTP"
          className="otp-input"
        />
        <div className="popup-buttons">
          <button className="register-btn" onClick={buttonSubmit}>Submit</button>
          <button className="register-btn close-btn" onClick={CancelClick} >Close</button>


        </div>
        <button className="resend-otp" onClick={ResendEmail}>Resend Otp</button>
        <span>{Message}</span>

        {!otp ? (
          <span className="otp-message error">{validationError}</span>
        ) : (
          <span className="otp-message">{message}</span>
        )}
      </div>
    </div>

  );
};

export default OtpPopup;
