import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    feedbackToken: {
      type: String,
      required: true,
    },
    reviewerName: {
      type: String,
      default: "Anonymous",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Feedback", feedbackSchema);
