import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "routes/authRoutes";
import entertainmentRoutes from "routes/entertainmentRoutes";
import { errorHandler, limiterMiddleware, requestLogger } from "middlewares";
import { connectDB, logger, passportConfig } from "config";

dotenv.config();

const app = express();
const secret = process.env.SECRET as string;

const corsOption = {
  origin: process.env.FRONTEND_URL as string,
  credentials: true,
};

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

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(
  helmet.hsts({
    maxAge: 60 * 60 * 24 * 30,
    includeSubDomains: true,
    preload: true,
  })
);

app.use(cors(corsOption));
app.use(limiterMiddleware);

app.use(requestLogger);

app.use("/api/auth", authRoutes);
app.use("/api/entertainment", entertainmentRoutes);

app.use(errorHandler);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ message: "Server Error" });
});

export default app;
