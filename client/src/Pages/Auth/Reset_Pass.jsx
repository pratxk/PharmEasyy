import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/Actions/authActions';

function Reset_Pass() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const { userId, token } = useParams(); // Extracts userId and token from the URL path

    const { resetPasswordStatus, error } = useSelector((state) => state.auth);
    const [password, setPassword] = useState('');

    const handleChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!token || !userId) {
            toast({
                title: 'Invalid link',
                description: 'The link is incomplete or invalid. Please request a new password reset link.',
                status: 'error',
                duration: 1500,
                isClosable: true,
            });
            return;
        }

        dispatch(resetPassword({ userId, token, password })).then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
                toast({
                    title: 'Password reset successful',
                    description: 'Your password has been reset successfully. Please log in with your new password.',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                    position:'top-right'
                });
                navigate('/login');
            } else {
                toast({
                    title: 'Error resetting password',
                    description: error || 'Something went wrong. Please try again.',
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                    position:'top-right'
                });
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Reset Your Password
                </h2>
                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white dark:text-black bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out dark:bg-white dark:hover:bg-gray-300 dark:focus:ring-gray-400">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Reset_Pass;
