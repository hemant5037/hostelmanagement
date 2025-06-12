import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name Is Required!"],
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required!"],
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    validate: [validator.isEmail, "Provide A Valid Email!"],
    unique: true,
  },
  phone: {
    type: String,
    required: function() {
      return !this.isGoogleUser; // Only required if not a Google user
    },
    validate: {
      validator: function(v) {
        if (!this.isGoogleUser) {
          return /^\d{10}$/.test(v);
        }
        return true;
      },
      message: "Phone Number Must Contain Exact 10 Digits!"
    }
  },
  nic: {
    type: String,
    required: function() {
      return !this.isGoogleUser; // Only required if not a Google user
    },
    validate: {
      validator: function(v) {
        if (!this.isGoogleUser) {
          return /^\d{5}$/.test(v);
        }
        return true;
      },
      message: "NIC Must Contain Only 5 Digits!"
    }
  },
  dob: {
    type: Date,
    required: function() {
      return !this.isGoogleUser; // Only required if not a Google user
    },
  },
  gender: {
    type: String,
    required: function() {
      return !this.isGoogleUser; // Only required if not a Google user
    },
    enum: ["Male", "Female", "Other"],
  },
  password: {
    type: String,
    required: function() {
      return !this.isGoogleUser; // Only required if not a Google user
    },
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    select: false,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values while maintaining uniqueness
  },
  role: {
    type: String,
    required: [true, "User Role Required!"],
    enum: ["Patient", "Doctor", "Admin"],
    default: "Patient",
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
  avatar: {
    type: String, // For storing Google profile picture URL
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  }
});

// Only hash password if it exists and is modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Update lastLogin timestamp on successful login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign(
    { 
      id: this._id,
      email: this.email,
      role: this.role,
      isGoogleUser: this.isGoogleUser
    }, 
    process.env.JWT_SECRET_KEY || 'your-secret-key', 
    {
      expiresIn: process.env.JWT_EXPIRES || '1d',
    }
  );
};

export const User = mongoose.model("User", userSchema);