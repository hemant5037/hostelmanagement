import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/userSchema.js';
import { config } from 'dotenv';
import session from 'express-session';
import express from 'express';

// Load environment variables
config({ path: "./config/config.env" });

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('Google OAuth credentials are not properly configured in environment variables');
  process.exit(1);
}

const app = express();



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
        if (!profile.emails || !profile.emails[0]) {
          return done(new Error('No email found in Google profile'), null);
        }

        // Get the mode from the session
        const mode = req.session.mode || 'login';

        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user && mode === 'register') {
          // Create new user if doesn't exist and mode is register
          const nameParts = profile.displayName.split(' ');
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(' ');

          user = await User.create({
            firstName,
            lastName,
            email: profile.emails[0].value,
            googleId: profile.id,
            role: 'Patient',
            isGoogleUser: true,
            avatar: profile.photos?.[0]?.value || '',
            phone: '0000000000',
            nic: '0000000000000',
            dob: new Date(),
            gender: 'Other',
            password: Math.random().toString(36).slice(-8),
          });
        } else if (!user && mode === 'login') {
          // If user doesn't exist and mode is login, return error
          return done(new Error('Account not found. Please register first.'), null);
        }

        return done(null, user);
      } catch (error) {
        console.error('Google authentication error:', error);
        return done(error, null);
      }
    }
  )
);

export default passport; 