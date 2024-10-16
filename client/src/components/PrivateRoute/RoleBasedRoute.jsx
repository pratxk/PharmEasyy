
import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

function RoleBasedRoute({ allowedRoles, children }) {

    const role = useSelector((state) => state?.auth?.user?.role)  ;
    const toast = useToast();
    useEffect(() => {
        if (!allowedRoles.includes(role)) {
            toast({
                title: "Unauthorized Access",
                description: "You're unauthorized to access this page.",
                status: "error",
                duration: 3000, // Show the toast for 3 seconds
                isClosable: true,
            });
        }
    }, [role, allowedRoles, toast]);

    return allowedRoles.includes(role) ? children : <Navigate to="/" />;
}

export default RoleBasedRoute;

