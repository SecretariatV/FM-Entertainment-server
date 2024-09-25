import { create, getEntertainament } from "controllers/entertainmentController";
import { Router } from "express";
import { authMiddleware } from "middlewares";

const router = Router();

router.post("/create", create);
router.get("/", getEntertainament);

export default router;
