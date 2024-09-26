import {
  changeBookmarkState,
  create,
  getBookmarked,
  getEntertainament,
} from "controllers/entertainmentController";
import { Router } from "express";

const router = Router();

router.post("/create", create);
router.post("/changeBookmark", changeBookmarkState);
router.get("/getBookmark", getBookmarked);
router.get("/", getEntertainament);

export default router;
