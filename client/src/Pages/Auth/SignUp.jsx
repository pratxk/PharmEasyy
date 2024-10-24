import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/Actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { position } from '@chakra-ui/react';

function SignUp() {
  const dispatch = useDispatch();
  const { isRegistered } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    ph_no: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Password validation
    const passwordMinLength = 8;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[@$!%*?&]/;

    // Phone number validation (Starts with 9, 8, 7, or 6 and exactly 10 digits)
    const phoneRegex = /^[9876]\d{9}$/;

    // First Name
    if (!formData.first_name) newErrors.first_name = 'First name is required.';
    
    // Last Name
    if (!formData.last_name) newErrors.last_name = 'Last name is required.';
    
    // Email
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    // Password validations
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else {
      if (formData.password.length < passwordMinLength) {
        newErrors.password = `Password must be at least ${passwordMinLength} characters long.`;
      }
      if (!hasUpperCase.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter.';
      }
      if (!hasLowerCase.test(formData.password)) {
        newErrors.password = 'Password must contain at least one lowercase letter.';
      }
      if (!hasNumber.test(formData.password)) {
        newErrors.password = 'Password must contain at least one number.';
      }
      if (!hasSpecialChar.test(formData.password)) {
        newErrors.password = 'Password must contain at least one special character (@, $, !, %, *, ?, &).';
      }
    }

    // Phone number
    if (!formData.ph_no) {
      newErrors.ph_no = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.ph_no)) {
      newErrors.ph_no = 'Phone number must start with 9, 8, 7, or 6 and be exactly 10 digits.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    dispatch(register(formData))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          toast({ description: 'Registered successfully', status: 'success', duration: 2000, position:'top-right' });
        } else {
          toast({ description: 'Registration failed', status: 'error', duration: 2300 , position:'top-right'});
        }
      });
  };

  if (isRegistered) {
    navigate('/login');
  }

  return (
    <div id='signUp_page' className="w-full mx-auto overflow-hidden my-28 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create your account</h5>

        <div className='flex gap-3'>
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="First name"
            />
            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
          </div>
          <div>
            <label htmlFor="last_name_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Last name"
            />
            {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="email_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
          <input
            type="input"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="email..."
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="ph_no_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
          <input
            type="tel"
            name="ph_no"
            id="ph_no"
            value={formData.ph_no}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="9728XXXXXX"
          />
          {errors.ph_no && <p className="text-red-500 text-xs mt-1">{errors.ph_no}</p>}
        </div>
        <button type="submit" className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-gray-800 dark:focus:ring-black">Sign Up</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already have an account? <Link to="/login" className="text-black hover:underline dark:text-blue-500">
            Log in
            </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
