// PrivateRoute.jsx

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';

function PrivateRoute({ children }) {
    const { isAuth } = useSelector((state) => state.auth)
    const toast = useToast();
    useEffect(() => {
        if (!isAuth) {
            toast({
                title: "Please Login !!",
                description: "You need to login first, to access this page.",
                status: 'info',
                duration: 1800, // Show the toast for 3 seconds
                isClosable: true,
                position: 'top-right',
                variant:'subtle'
            });
        }
    }, [isAuth]);

    return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
