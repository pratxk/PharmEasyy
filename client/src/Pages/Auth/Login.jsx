import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/Actions/authActions';
import { useToast } from '@chakra-ui/react';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { isAuth, error, user } = useSelector((state) => state.auth);


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
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
    dispatch(login(formData))
    .then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        toast({ description: 'Logged-in successfully', status: 'success' , duration:1800,  position:'top-right', isClosable: true});
      } else {
        toast({ description: 'Login failed', status: 'error', duration:2000, position:'top-right', isClosable: true });
      }
    })
    .catch((err) => {
      toast({ description: 'An error occurred', status: 'error' });
    });
  };

  useEffect(() => {
    if (isAuth) {
      if (user.role === 'admin') {

        navigate('/admin');
        return;
      }
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <div className="w-full mx-auto overflow-hidden my-32 max-w-sm p-4 bg-white border  border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Log in to our platform</h5>
        {/* {error && <p className="text-red-500">{error}</p>} */}

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
       
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
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
        <div className="flex items-start">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-black dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
          </div>
          <Link to="#" className="ms-auto text-sm text-black hover:underline dark:text-blue-500">Lost Password?</Link>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-gray-800 dark:focus:ring-black"
        >
          Login to your account
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <Link to='/register' className="text-black hover:underline dark:text-blue-500">Create account</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
