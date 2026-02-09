import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now },
});

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  text: String,
  likes: { type: Number, default: 0 },
  replies: [replySchema],
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema);
