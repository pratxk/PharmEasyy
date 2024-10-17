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
        return <div className="text-red-500">Error fetching user data: {error}</div>;
    }

    return (
        <div className="h-[100vh] m-10 bg-white shadow-lg rounded-lg overflow-hidden flex  items-center">
            <div className="relative w-full h-full">
                <div className='ml-48 '>
                    <img
                        src={userProfile}
                        alt="User Profile"
                        className="absolute h-full w-full object-cover opacity-100"
                    />
                </div>
                <div className="absolute z-10 top-2 p-10 flex flex-col items-center bg-transparent  rounded-lg ">
                    <h2 className="text-4xl font-semibold text-white p-3 rounded-3xl bg-gray-800 mb-6">User Profile</h2>
                    <div className="mt-4 text-left">
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

export default Profile;
