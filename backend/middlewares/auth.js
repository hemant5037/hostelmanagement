import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate dashboard users
export const isAdminAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
      return next(
        new ErrorHandler("Dashboard User is not authenticated!", 400)
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);//userschema m jsonwebtoken generater m humne user ki id ko store kiya h 
    if (req.user.role !== "Admin") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }     //here this is the from if to above next this is the authentication function and here we check both authentication and authorization combined no another function is use dto do this because there is no another function for authorization because here unique token generate so it allow both patient and admin  
    next();
  }
);
// Middleware to authenticate frontend users
export const isPatientAuthenticated = catchAsyncErrors(
    async (req, res, next) => {
      const token = req.cookies.patientToken;
      if (!token) {
        return next(new ErrorHandler("User is not authenticated!", 400));
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id);
      if (req.user.role !== "Patient") {
        return next(
          new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
        );
      }
      next();
    }
  );
