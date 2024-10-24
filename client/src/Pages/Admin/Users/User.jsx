import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../../components/Skeleton/Heading';
import { deleteUser, fetchAllUsers } from '../../../redux/Actions/authActions';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { useToast } from '@chakra-ui/react';
import OrdersSkeleton from '../../../components/Skeleton/OrderSkeleton';

function User() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { allUsers, error, isLoading } = useSelector((state) => state.auth);
  
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [userToDelete, setUserToDelete] = useState(null); // State to track the user to be deleted

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    setUserToDelete(userId); // Set the user ID to delete
    setIsModalOpen(true); 
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await dispatch(deleteUser(userToDelete)); // Await the deletion
        toast({
          title: "User deleted successfully.",
          status: "success",
          duration: 2800,
          isClosable: true,
          position: "top-right",
        });
      } catch (err) {
        console.error(err); // Log the error if needed
        toast({
          title: "Error deleting user.",
          description: "There was an issue while deleting the user. Please try again.",
          status: "error",
          duration: 2800,
          isClosable: true,
          position: "top-right",
        });
      } finally {
        setUserToDelete(null); // Reset user ID after deletion
        setIsModalOpen(false); 
      }
    }
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
        <OrdersSkeleton/> // Replace with a loading spinner or skeleton if desired
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
                      disabled={user.role === 'admin'}
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        description={`Are you sure you want to delete this user? This action cannot be undone.`}
      />
    </div>
  );
}

export default User;
