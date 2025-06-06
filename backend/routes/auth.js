import express from 'express';
import passport from 'passport';
import { generateToken } from '../utils/generateToken.js';
import { GoogleStrategy } from 'passport-google-oauth20';

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/api/auth/google/callback',
      scope: ['profile', 'email'],
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const mode = req.session.mode || 'login';
        // ... rest of your logic
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default router; 