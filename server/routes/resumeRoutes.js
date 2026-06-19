import express from "express";
import {
  uploadResume,
  getResumes,
  getResume,
  deleteResume,
} from "../controllers/resumeController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/", protect, getResumes);
router.get("/:id", protect, getResume);
router.delete("/:id", protect, deleteResume);

export default router;
