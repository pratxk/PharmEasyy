// PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
    const {isAuth} = useSelector((state)=>state.auth)
    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
