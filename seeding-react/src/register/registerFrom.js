import React, { useEffect, useState } from "react";
import './registerForm.css';
import Cookies from "js-cookie";
import apiFetch from "../middleware/apiFetch";
import { useForm } from "react-hook-form";
const RegisterForm = ({ onClose, methods, editData, editId, empty }) => {

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const Password = watch('Password');
  const token = Cookies.get('token');
  useEffect(() => {
    if (editData) {
      reset({
        username: editData.username,
        email: editData.email,

      })
    }
  }, []);






  const onEditFunction = async (formValues) => {
    try {
      const response = await apiFetch(`http://localhost:3000/auth/edit/${editId}`, {
        method: 'PUT',
        body: {
          username: formValues.username,
          email: formValues.email,
          password: formValues.Password,
          confirmPassword: formValues.confirmPassword
        }
      })
      methods();
      empty();
      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onClickRegister = async (formValues) => {
    try {
      const response = await apiFetch('http://localhost:3000/auth/createUI', {
        method: 'POST',
        body: {
          username: formValues.username,
          email: formValues.email,
          password: formValues.Password,
          confirmPassword: formValues.confirmPassword
        }
      });
      methods();
      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit(editData ? onEditFunction : onClickRegister)} className="register-form">
          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="Enter username" {...register('username', { required: 'Username is required', minLength: { value: 5, message: "Username must be at least 5 characters" }, maxLength: { value: 12, message: "Username must not exceed 12 characters" }, pattern: { value: /^[a-zA-Z]*$/, message: 'Username must only contains letters' } })} />
            {errors.username && (<p style={{ color: "red" }}>{errors.username.message} </p>)}
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })} />
            {errors.email && (<p style={{ color: 'red' }}>{errors.email.message}</p>)}
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" {...register('Password', { required: 'Password is required', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Minimum 8 characters in length at least one lowercase letter at least one uppercase letter at least one digit at least one special character no whitespace' } })} />
            {errors.Password && (<p style={{ color: 'red' }}>{errors.Password.message}</p>)}
          </div>
          <div className="input-group">
            <label>ConFirm Password</label>
            <input type="password" placeholder="Enter Confirm password" {...register('confirmPassword', { required: 'ConfirmPassword is required', validate: (value) => value === Password || 'Passwords do not match' })} />
            {errors.confirmPassword && (<p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>)}
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {editData ? 'Update' : 'Create'}
            </button>
            <button type="button" className="close-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
