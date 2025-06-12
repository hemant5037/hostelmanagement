import { useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { API_ENDPOINTS } from "../config/api";

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegisterPage = location.pathname === '/register';

  const handleGoogleSignIn = () => {
    // Redirect to backend Google auth endpoint with mode parameter
    const mode = isRegisterPage ? 'register' : 'login';
    window.location.href = `${API_ENDPOINTS.GOOGLE_AUTH}?mode=${mode}`;
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <FaGoogle className="w-5 h-5 mr-2" />
      {isRegisterPage ? 'Sign up with Google' : 'Sign in with Google'}
    </button>
  );
};

export default GoogleSignIn; 