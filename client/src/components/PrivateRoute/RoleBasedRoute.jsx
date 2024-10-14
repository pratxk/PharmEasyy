import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function RoleBasedRoute({ allowedRoles, children }) {
    const role= useSelector((state)=>state.auth.user.role)
    // console.log(role)
    return allowedRoles.includes(role) ? children : <Navigate to="/not-authorized" />;
}

export default RoleBasedRoute;