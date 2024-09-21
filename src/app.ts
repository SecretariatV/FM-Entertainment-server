import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "routes/authRoutes";
import { errorHandler, requestLogger } from "middlewares";
import { connectDB, logger, passportConfig } from "config";

dotenv.config();

const app = express();
const secret = process.env.SECRET as string;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use(requestLogger);

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ message: "Server Error" });
});

export default app;
