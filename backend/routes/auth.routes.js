import express from 'express';
import passport from 'passport';
import { User } from '../models/userSchema.js';
import { generateToken } from '../utils/jwtToken.js';

const router = express.Router();

// Google OAuth routes
router.get('/google',
  (req, res, next) => {
    req.session.mode = req.query.mode || 'login';
    next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user) => {
      if (err || !user) {
        // Redirect to frontend login with error message
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(err?.message || 'Account not found. Please signup first.')}`);
      }
      // If this is a registration, redirect to login with a message
      if (req.session.mode === 'register') {
        return res.redirect(`${process.env.FRONTEND_URL}/login?success=${encodeURIComponent('Signup successful! Please login through the login page.')}`);
      }
      // Generate token and redirect to frontend
      const token = user.generateJsonWebToken();
      return res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
    })(req, res, next);
  }
);

// Manual login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'Account not found. Please signup first.' });
    }

    // Check if user was registered with Google
    if (user.googleId && !user.password) {
      return res.status(400).json({ message: 'Please login with Google' });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token using the same function as Google auth
    generateToken(user, "Login Successful!", 200, res);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 