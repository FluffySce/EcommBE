import express from "express";
import Review from "../models/reviewModel.js";
const router = express.Router();

//get reviews for a product
router.get("/:productId", async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId });
  res.json(reviews);
});

//posting a new review

router.post("/:productId", async (req, res) => {
  const { text } = req.body;
  const review = new Review({ product: req.params.productId, text });
  await review.save();
  // Redirect to the EJS reviews page for the product
  res.redirect(`/products/${req.params.productId}/reviews`);
});

//patch - for likes and replies
router.patch("/:reviewId", async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) return res.status(404).send("Review not available");
  if (req.body.like) review.likes += 1;
  if (req.body.reply) review.replies.push({ text: req.body.reply });
  await review.save();
  // Redirect to the product's reviews page
  res.redirect(`/products/${review.product}/reviews`);
});

export default router;
