import mongoose from "mongoose";

const atsReportSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    breakdown: {
      hasEmail: Boolean,
      hasPhone: Boolean,
      hasGithub: Boolean,
      hasLinkedin: Boolean,
      hasSkills: Boolean,
      hasProjects: Boolean,
      hasExperience: Boolean,
      hasEducation: Boolean,
    },
    missingItems: [String],
  },
  { timestamps: true },
);

export default mongoose.model("ATSReport", atsReportSchema);
