import express from 'express';
import passport from 'passport';
import { generateToken } from '../utils/generateToken.js';

const router = express.Router();

// Google OAuth routes
router.get('/google',
  (req, res, next) => {
    // Store the mode in the session
    req.session.mode = req.query.mode || 'login';
    next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user);

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth-callback?token=${token}`);
  }
);

export default router; 