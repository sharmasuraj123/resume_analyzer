import Resume from "../models/Resume.js";
import Feedback from "../models/Feedback.js";

// @desc    Get resume by feedback token (PUBLIC - no login needed)
// @route   GET /api/feedback/:token
export const getResumeByToken = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      feedbackToken: req.params.token,
    }).select("fileName fileUrl version createdAt");

    if (!resume) {
      return res.status(404).json({ message: "Invalid or expired link" });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit feedback (PUBLIC - no login needed)
// @route   POST /api/feedback/:token
export const submitFeedback = async (req, res) => {
  try {
    const { reviewerName, rating, comment, isAnonymous } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const resume = await Resume.findOne({ feedbackToken: req.params.token });

    if (!resume) {
      return res.status(404).json({ message: "Invalid or expired link" });
    }

    const feedback = await Feedback.create({
      resume: resume._id,
      feedbackToken: req.params.token,
      reviewerName: isAnonymous ? "Anonymous" : reviewerName || "Anonymous",
      rating,
      comment,
      isAnonymous: !!isAnonymous,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all feedback for a resume (PRIVATE - owner only)
// @route   GET /api/feedback/resume/:resumeId
export const getFeedbackForResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const feedbacks = await Feedback.find({ resume: resume._id }).sort({
      createdAt: -1,
    });

    const avgRating =
      feedbacks.length > 0
        ? (
            feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
          ).toFixed(1)
        : 0;

    res.json({
      totalFeedbacks: feedbacks.length,
      averageRating: Number(avgRating),
      feedbacks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
