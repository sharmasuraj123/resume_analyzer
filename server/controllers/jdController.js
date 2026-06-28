import Resume from "../models/Resume.js";
import JDMatch from "../models/JDMatch.js";
import { compareKeywords } from "../utils/keywordExtractor.js";

// @desc    Compare resume with job description
// @route   POST /api/jd/:resumeId
export const matchJobDescription = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || jobDescription.trim().length < 20) {
      return res
        .status(400)
        .json({ message: "Please provide a valid job description" });
    }

    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { matchScore, matched, missing } = compareKeywords(
      resume.extractedText,
      jobDescription,
    );

    const jdMatch = await JDMatch.create({
      resume: resume._id,
      user: req.user._id,
      jobDescription,
      matchScore,
      matchedKeywords: matched,
      missingKeywords: missing,
    });

    res.status(201).json({
      message: "JD match score generated",
      result: jdMatch,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all JD matches for a resume
// @route   GET /api/jd/:resumeId
export const getJDMatches = async (req, res) => {
  try {
    const matches = await JDMatch.find({ resume: req.params.resumeId }).sort({
      createdAt: -1,
    });

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
