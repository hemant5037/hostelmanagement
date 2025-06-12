import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast.error(error || 'Google authentication failed!');
      navigate('/login');
      return;
    }

    if (token) {
      try {
        // Store the token and redirect to home
        login(token);
        toast.success('Login successful!');
        navigate('/');
      } catch (error) {
        toast.error('Failed to process login.');
        navigate('/login');
      }
    } else {
      toast.error('No token received from Google.');
      navigate('/login');
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