import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../../redux/Actions/authActions';
import adminProfile from '../../../assets/file.png';

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
        <div className="h-[100vh] m-10 bg-white shadow-md rounded-lg overflow-hidden relative">
            <div className="flex items-center justify-center h-full relative z-10">
                <img src={adminProfile} alt="Admin Profile" className="absolute left-100 z-0 h-full w-full object-cover opacity-100 bg-transparent  p-3 ml-11" />
                <div className="p-10 z-20 absolute top-2 left-2">
                    <h2 className="text-4xl font-semibold text-white text-center p-4 rounded-3xl bg-gray-900">Admin Profile</h2>
                    <div className="mt-4 ml-4">
                        <p className="text-xl text-gray-900"><strong>First Name:</strong> {singleUser.first_name}</p>
                        <p className="text-xl text-gray-900"><strong>Last Name:</strong> {singleUser.last_name}</p>
                        <p className="text-xl text-gray-900"><strong>Email:</strong> {singleUser.email}</p>
                        <p className="text-xl text-gray-900">
                            <strong>Joined on:</strong> {new Date(singleUser.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
