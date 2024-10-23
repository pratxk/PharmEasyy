import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../redux/Actions/authActions';
import userProfile from '../../assets/userProfile.png'; // Update the path if needed

const Profile = () => {
    const dispatch = useDispatch();
    const { singleUser, error, isAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchCurrentUser());
        }
    }, [dispatch, isAuth]);

    if (error) {
        return <div className="text-red-500 text-center mt-10">Error fetching user data: {error}</div>;
    }

    if (!singleUser) {
        return <div className="text-gray-500 text-center mt-10">Loading user data...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="relative bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
                {/* Profile Image */}
                <div className="relative w-full md:w-1/2 h-96 md:h-auto">
                    <img
                        src={userProfile}
                        alt="User Profile"
                        className="object-cover h-full w-full"
                    />
                </div>
                
                {/* User Info */}
                <div className="relative z-10 p-8 bg-gray-800 text-white w-full md:w-1/2 flex flex-col justify-center items-center">
                    <h2 className="text-4xl font-bold mb-4">User Profile</h2>
                    <div className="text-left w-full">
                        <p className="text-xl mb-2"><strong>First Name:</strong> {singleUser.first_name || 'N/A'}</p>
                        <p className="text-xl mb-2"><strong>Last Name:</strong> {singleUser.last_name || 'N/A'}</p>
                        <p className="text-xl mb-2"><strong>Email:</strong> {singleUser.email || 'N/A'}</p>
                        <p className="text-xl mb-2">
                            <strong>Joined on:</strong> {singleUser.created_at ? new Date(singleUser.created_at).toLocaleDateString() : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
