import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/Actions/authActions';
import { Link, useNavigate } from 'react-router-dom';

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

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'first_name':
        if (!value) error = 'First name is required.';
        else if (/[^a-zA-Z]/.test(value)) error = 'First name should contain only letters.';
        break;
      case 'last_name':
        if (!value) error = 'Last name is required.';
        else if (/[^a-zA-Z]/.test(value)) error = 'Last name should contain only letters.';
        break;
      case 'email':
        if (!value) error = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format.';
        break;
      case 'password':
        if (!value) error = 'Password is required.';
        else if (value.length < 8) error = 'Password must be at least 8 characters long.';
        else if (!/[A-Z]/.test(value)) error = 'Password must contain at least one uppercase letter.';
        else if (!/[a-z]/.test(value)) error = 'Password must contain at least one lowercase letter.';
        else if (!/\d/.test(value)) error = 'Password must contain at least one number.';
        else if (!/[@$!%*?&]/.test(value)) error = 'Password must contain at least one special character (@, $, !, %, *, ?, &).';
        break;
      case 'ph_no':
        if (!value) {
          error = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Phone number must be exactly 10 digits.';
        } else if (/[^0-9]/.test(value)) {
          error = 'Phone number must contain only numeric digits.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the specific field on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const validationErrors = {};
    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) validationErrors[field] = error;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    dispatch(register(formData))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          toast({
            description: 'Registered successfully',
            status: 'success',
            duration: 2000,
            position: 'top-right',
          });
        } else {
          toast({
            description: 'Registration failed',
            status: 'error',
            duration: 2300,
            position: 'top-right',
          });
        }
      });
  };

  if (isRegistered) {
    navigate('/login');
  }

  return (
    <div id="signUp_page" className="w-full mx-auto overflow-hidden my-28 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create your account</h5>

        <div className="flex gap-3">
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
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
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
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="email@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
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
          <label htmlFor="ph_no" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
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
          Already have an account? <Link to="/login" className="text-black hover:underline dark:text-blue-500">Log in</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
