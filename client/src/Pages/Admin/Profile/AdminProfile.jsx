import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../../redux/Actions/authActions';

const AdminProfile = () => {
    const dispatch = useDispatch();
    const { singleUser, error, isAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchCurrentUser());
        }
    }, [dispatch, isAuth]);

    if (error) {
        return <div className="text-red-500">Error fetching user data: {error}</div>;
    }

    return (
        <div className="h-[100vh] w-[99vw] m-10 bg-white shadow-md rounded-lg overflow-hidden ">
            <div className="p-10 ">
                <h2 className="text-2xl font-semibold text-gray-800">Admin Profile</h2>
                <div className="mt-4">
                    <p className="text-gray-600"><strong>First Name:</strong> {singleUser.first_name}</p>
                    <p className="text-gray-600"><strong>Last Name:</strong> {singleUser.last_name}</p>
                    <p className="text-gray-600"><strong>Email:</strong> {singleUser.email}</p>
                    <p className="text-gray-600">
                        <strong>Joined on:</strong> {new Date(singleUser.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
