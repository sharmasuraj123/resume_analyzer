import express from "express";
import {
  generateATSScore,
  getATSReport,
} from "../controllers/atsController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:resumeId", protect, generateATSScore);
router.get("/:resumeId", protect, getATSReport);

export default router;
