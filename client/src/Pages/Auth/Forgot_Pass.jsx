import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../redux/Actions/authActions';

function Forgot_Pass() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { forgotPasswordStatus, error } = useSelector((state) => state.auth);
    const toast = useToast();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    // Regular expression for validating an email address
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleChange = (e) => {
        const inputEmail = e.target.value.trim();

        // Validate email format
        if (!emailRegex.test(inputEmail)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }

        setEmail(inputEmail);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic email format validation
        if (!emailRegex.test(email)) {
            toast({
                title: 'Invalid email format',
                description: 'Please enter a valid email address.',
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }

        // Dispatch the forgotPassword action if email is valid
        dispatch(forgotPassword(email)).then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
                toast({
                    title: 'Email sent successfully',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                    position: 'top-right'
                });
            } else {
                toast({
                    title: error || 'No email found',
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                    position: 'top-right'
                });
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Change Password
                </h2>
                <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleChange}
                            className={`bg-gray-50 border ${emailError ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            placeholder="name@company.com"
                            required
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            title="Please enter a valid email address."
                        />
                        {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white dark:text-black bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-300 dark:focus:ring-gray-400 transition duration-150 ease-in-out"
                    >
                        Send
                    </button>
                    <p className='pl-1 text-black dark:text-white'>Note: We'll send an email to reset your password...</p>
                </form>
            </div>
        </div>
    );
}

export default Forgot_Pass;
