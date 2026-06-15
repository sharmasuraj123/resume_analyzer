import mongoose from "mongoose";

const jdMatchSchema = new mongoose.Schema(
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
    jobDescription: {
      type: String,
      required: true,
    },
    matchScore: {
      type: Number,
      required: true,
    },
    matchedKeywords: [String],
    missingKeywords: [String],
  },
  { timestamps: true },
);

export default mongoose.model("JDMatch", jdMatchSchema);
