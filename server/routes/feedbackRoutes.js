import express from "express";
import {
  getResumeByToken,
  submitFeedback,
  getFeedbackForResume,
} from "../controllers/feedbackController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes (anyone with the link, no login)
router.get("/:token", getResumeByToken);
router.post("/:token", submitFeedback);

// Private route (owner only)
router.get("/resume/:resumeId", protect, getFeedbackForResume);

export default router;
