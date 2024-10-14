import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../../components/Skeleton/Heading';
import { deleteUser, fetchAllUsers } from '../../../redux/Actions/authActions';

function User() {
  const dispatch = useDispatch();
  const { allUsers, error, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // console.log(allUsers)

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId)); 
  };

  return (
    <div className="overflow-hidden p-10">
      <Heading
        text={"Users"}
        textColor={"primary"}
        fromGradient={"secondary"}
        toGradient={"primary"}
      />

      {error && <div className="text-red-500">{error}</div>}
      
      {isLoading ? (
        <div>Loading...</div> // Replace with a loading spinner or skeleton if desired
      ) : (
        <div className="overflow-x-auto h-[100vh]">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Sr. No</th>
                <th className="py-2 px-4 border-b text-left">User ID</th>
                <th className="py-2 px-4 border-b text-left">User Name</th>
                <th className="py-2 px-4 border-b text-left">Creation Time</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{user._id}</td>
                  <td className="py-2 px-4 border-b">{`${user.first_name} ${user.last_name}`}</td>
                  <td className="py-2 px-4 border-b">{new Date(user.created_at).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-white font-mono p-4 bg-red-600 hover:bg-red-500"
                      disabled={user.role ==='admin' ? true : false}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default User;
