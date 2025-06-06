import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';

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
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      // Create JWT token
      const token = jwt.sign(
        { 
          id: req.user._id,
          email: req.user.email,
          role: req.user.role
        },
        process.env.JWT_SECRET_KEY || 'your-secret-key',
        { expiresIn: process.env.JWT_EXPIRES || '1d' }
      );

      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5174'}/auth/callback?token=${token}`);
    } catch (error) {
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5174'}/login?error=auth_failed`);
    }
  }
);

// Manual login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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

    // Create JWT token
    const token = jwt.sign(
      { 
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET_KEY || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRES || '1d' }
    );

    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 