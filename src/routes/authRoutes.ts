import {
  googleCallback,
  login,
  logout,
  signup,
} from "controllers/authController";
import { Router } from "express";
import { authMiddleware } from "middlewares";
import passport from "passport";

const router = Router();

router.post("/signup", signup);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);
router.get("/signout", logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

export default router;
