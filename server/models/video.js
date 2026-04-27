const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    notes: {
      type: String
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);