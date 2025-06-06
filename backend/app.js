import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import session from "express-session";
import { dbConnection } from "./database/dbConnection.js"; 
import messageRouter from "./routes/messageRouter.js"
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import appointmentRouter from "./routes/appointmentRouter.js";
import passport from "./config/google.config.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
config({ path: "./config/config.env" });

// Add express-session middleware before routes
app.use(
  session({
    secret: 'your_secret_key', // use a strong secret in production!
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if using HTTPS
  })
);

// Initialize Passport
app.use(passport.initialize());

app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/message/", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/auth", authRouter);

dbConnection();
app.use(errorMiddleware);

export default app;