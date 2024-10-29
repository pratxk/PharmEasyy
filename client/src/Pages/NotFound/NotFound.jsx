import { Link } from 'react-router-dom';
import errorimg from "../../assets/404.png";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center ">
        <div className="flex items-center animate-bounce ml-3 justify-center bg-transparent">
          <h1 className="text-9xl font-extrabold mr-[-160px] text-gray-800">4</h1>
          <img src={errorimg} alt="404" className='w-3/4 ' />
          <h1 className="text-9xl font-extrabold ml-[-130px] text-gray-800">4</h1>
        </div>
        <h2 className="text-4xl mt-[-200px] font-semibold text-gray-800">Page Not Found</h2>
        <p className="text-lg text-gray-600 mt-2">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="mt-8 inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-105">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;