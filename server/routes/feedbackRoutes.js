import express from "express";
import {
  getResumeByToken,
  submitFeedback,
  getFeedbackForResume,
} from "../controllers/feedbackController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Private route (owner only)
router.get("/resume/:resumeId", protect, getFeedbackForResume);

// Public routes (anyone with the link, no login)
router.get("/:token", getResumeByToken);
router.post("/:token", submitFeedback);



export default router;
