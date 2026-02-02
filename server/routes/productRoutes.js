import express from "express";
import Product from "../models/productModel.js";
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { name, dateCreated, warranty, price, isAvailable } = req.body;
    const product = new Product({
      name,
      dateCreated,
      warranty,
      price,
      isAvailable,
    });
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
