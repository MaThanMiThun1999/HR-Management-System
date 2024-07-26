// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); 
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
