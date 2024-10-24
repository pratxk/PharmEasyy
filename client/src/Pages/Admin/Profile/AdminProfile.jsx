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
    return <div className="text-red-500 text-center mt-10">Error fetching user data: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-3/4 lg:w-1/2 bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Background Image */}
        <img
          src={adminProfile}
          alt="Admin Profile"
          className="absolute inset-0 object-cover w-full h-full opacity-30"
        />

        {/* Overlay for content */}
        <div className="relative z-10 p-8 lg:p-12">
          <h2 className="text-4xl font-bold  text-center bg-gray-900 text-white p-4 rounded-md">
            Admin Profile
          </h2>
          <div className="mt-6 space-y-4 ">
            <p className="text-lg lg:text-xl text-gray-800">
              <strong className="font-semibold">First Name:</strong> {singleUser?.first_name || 'N/A'}
            </p>
            <p className="text-lg lg:text-xl text-gray-800">
              <strong className="font-semibold">Last Name:</strong> {singleUser?.last_name || 'N/A'}
            </p>
            <p className="text-lg lg:text-xl text-gray-800">
              <strong className="font-semibold">Email:</strong> {singleUser?.email || 'N/A'}
            </p>
            <p className="text-lg lg:text-xl text-gray-800">
              <strong className="font-semibold">Joined on:</strong>{' '}
              {singleUser?.created_at
                ? new Date(singleUser.created_at).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
