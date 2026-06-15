import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    feedbackToken: {
      type: String,
      unique: true,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Resume", resumeSchema);
