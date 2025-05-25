class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  // error handler is the class already in the javascript
  
  export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error"; // error middleware k andar 4 quantitiy jayengi err,req,res,next
    err.statusCode = err.statusCode || 500;
  
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
        err = new ErrorHandler(message, 400);   //if there is email exits already then it shows error
    }
    if (err.name === "JsonWebTokenError") {
      const message = `Json Web Token is invalid, Try again!`;
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "TokenExpiredError") {
      const message = `Json Web Token is expired, Try again!`;
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "CastError") {
      const message = `Invalid ${err.path}`,
        err = new ErrorHandler(message, 400); // if first name type is string but we don't put the input as a string then it shows the error 
    }
  
    const errorMessage = err.errors // if err exist krte h to only specific error hi present ho agar mail h to wahin display ho only
      ? Object.values(err.errors)
          .map((error) => error.message)
          .join(" ")
      : err.message;
  
    return res.status(err.statusCode).json({
      success: false,
      
      message: errorMessage,
    });
  };
  
  export default ErrorHandler;