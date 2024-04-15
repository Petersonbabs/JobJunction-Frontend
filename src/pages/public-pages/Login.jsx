import React, { useEffect, useState } from 'react';
import { UseAuthContext } from '../../contexts/AuthContext';
import { Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginImage from '../../assets/loginUser.png';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const { loginUser, errorMessage, successMessage, warningMessage } = UseAuthContext();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    loginUser(data);
  };

  // Display toast notifications for validation errors
  React.useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  React.useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  useEffect(()=>{
    if (warningMessage) {
      toast.warning(warningMessage);
    }
  }, [warningMessage])

  return (
    <div className="form login">
      <h2>Log in</h2>

      <div className="con">
        <div className="loginLeft">
          <img src={LoginImage} alt="" width={400} />
        </div>

        <div className='loginForm'>
          {/* <ToastContainer /> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Email</label>
              <input type="email" {...register('email')} placeholder='email' />
              {errors.email && <Typography color='error'>{errors.email.message}</Typography>}
            </div>

            <div>
              <label>Password</label>
              <input type="password" {...register('password')} placeholder='password' />
              {errors.password && <Typography color='error'>{errors.password.message}</Typography>}
            </div>

            <button type="submit" className='loginBtn '> <div className="spinner-border d-none loginSpinner" role="status"></div> Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
