import app from "./app.js";
import cloudinary from "cloudinary";
import { config } from "dotenv";
import passport from "./config/google.config.js";
import authRoutes from "./routes/auth.routes.js";

// Load environment variables
config({ path: "./config/config.env" });

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Passport setup
console.log("Mounting passport.initialize()");
app.use(passport.initialize());

// Remove duplicate Auth Routes mounting from server.js
// console.log("Mounting /api/auth");
// app.use("/api/auth", authRoutes);

// Start server
app.listen(process.env.PORT || 4000, () => {
  console.log(`server listening at port ${process.env.PORT || 4000}`);
});
