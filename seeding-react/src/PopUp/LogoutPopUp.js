import React from "react";
import './LogoutPopUp.css'
import apiFetch from "../middleware/apiFetch";
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const LogoutPopup = () => {
  const navigate = useNavigate();

  const LogoutClick = async () => {
    const sessionId = Cookies.get('sessionId');
    console.log(sessionId);

    const response = await apiFetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      body: { sessionId: sessionId }

    });
    const data = await response.json();
    if (response.ok) {
      Cookies.remove('sessionId');
      Cookies.remove('OtpsessionId');
      navigate('/login')
    }



  }


  return (
    <div className="logout-popup-overlay">
      <div className="logout-popup">
        <p>Are you sure you want to logout?</p>
        <div className="btns">
          <button className="confirm-btn" onClick={LogoutClick} >Logout</button>
          <button className="cancel-btn" >Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
