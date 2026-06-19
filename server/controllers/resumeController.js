import Resume from "../models/Resume.js";
import cloudinary from "../config/cloudinary.js";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";

// @desc    Upload resume
// @route   POST /api/resume/upload
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a PDF file" });
    }

    // Get PDF from cloudinary url and extract text
    const response = await fetch(req.file.path);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF
    const pdfData = await pdfParse(buffer);
    const extractedText = pdfData.text;

    // Generate unique feedback token
    const feedbackToken = uuidv4();

    // Get version number
    const existingResumes = await Resume.countDocuments({
      user: req.user._id,
    });

    // Save resume to database
    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      publicId: req.file.filename,
      extractedText,
      feedbackToken,
      version: existingResumes + 1,
    });

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume: {
        _id: resume._id,
        fileName: resume.fileName,
        fileUrl: resume.fileUrl,
        feedbackToken: resume.feedbackToken,
        version: resume.version,
        createdAt: resume.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all resumes of logged in user
// @route   GET /api/resume
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("-extractedText");

    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single resume
// @route   GET /api/resume/:id
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Check if resume belongs to logged in user
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resume/:id
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Delete from cloudinary
    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "raw",
    });

    await resume.deleteOne();

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
