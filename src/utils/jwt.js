import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
// import { useNavigate } from 'react-router-dom';
// import React from 'react';
import { AuthProvider } from 'src/contexts/JWTContext';
//
import axios from './axios';

// ----------------------------------------------------------------------




const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

 const handleTokenExpired = (exp) => {
 
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  expiredTimer = window.setTimeout(() => {
    AuthProvider.logout();
    
  }, timeLeft);
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken);
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession, verify, sign };
