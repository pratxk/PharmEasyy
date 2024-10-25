import { Link } from 'react-router-dom';
// import './NotFound.css'; // Make sure to import your CSS file

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-black to-red-600">
      <div className="text-center">
        <h1 className="text-9xl animate-bounce font-bold text-white ">404</h1>
        <p className="text-2xl font-semibold text-white mt-8">Page Not Found</p>
        <p className="text-lg text-white mt-2">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="mt-8 inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-red-600 hover:text-white transition duration-300">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;