import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast.error('Google authentication failed!');
      navigate('/login?error=auth_failed');
      return;
    }

    if (token) {
      try {
        // Decode the token to get user information
        const decodedToken = jwtDecode(token);
        const userData = {
          id: decodedToken.id,
          email: decodedToken.email,
          name: decodedToken.name
        };
        login(token, userData);
        toast.success('Login successful!');
        navigate('/'); // Redirect to home page after successful login
      } catch (error) {
        toast.error('Invalid token received from Google.');
        navigate('/login?error=invalid_token');
      }
    } else {
      toast.error('No token received from Google.');
      navigate('/login?error=no_token');
    }
    // eslint-disable-next-line
  }, []); // Only run once

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Processing your login...</h2>
        <p className="text-gray-600">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
};

export default AuthCallback; 