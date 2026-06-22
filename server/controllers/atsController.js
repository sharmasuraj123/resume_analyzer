import Resume from "../models/Resume.js";
import ATSReport from "../models/ATSReport.js";
import { calculateATSScore } from "../utils/atsScorer.js";

// @desc    Generate ATS score for a resume
// @route   POST /api/ats/:resumeId
export const generateATSScore = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { score, breakdown, missingItems } = calculateATSScore(
      resume.extractedText,
    );

    // Save or update report (one report per resume)
    const atsReport = await ATSReport.findOneAndUpdate(
      { resume: resume._id },
      {
        resume: resume._id,
        user: req.user._id,
        score,
        breakdown,
        missingItems,
      },
      { upsert: true, new: true },
    );

    res.status(201).json({
      message: "ATS score generated",
      report: atsReport,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get ATS report for a resume
// @route   GET /api/ats/:resumeId 
export const getATSReport = async (req, res) => {
  try {
    const report = await ATSReport.findOne({ resume: req.params.resumeId });

    if (!report) {
      return res
        .status(404)
        .json({ message: "ATS report not found. Generate it first." });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
