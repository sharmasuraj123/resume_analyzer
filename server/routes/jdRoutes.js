import express from "express";
import {
  matchJobDescription,
  getJDMatches,
} from "../controllers/jdController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:resumeId", protect, matchJobDescription);
router.get("/:resumeId", protect, getJDMatches);

export default router;
