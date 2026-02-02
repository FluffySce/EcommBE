import express from "express";
import Product from "../models/productModel.js";
const router = express.Router();

// Render EJS product list
router.get("/view", async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("products/list", { products });
  } catch (err) {
    res.status(500).send("Error loading products");
  }
});

//show new product form
router.get("/new", (req, res) => {
  res.render("products/new");
});

//adding new products
router.post("/new", async (req, res) => {
  try {
    const { name, dateCreated, warranty, price } = req.body;
    const isAvailable = req.body.isAvailable === "on";
    const product = new Product({
      name,
      dateCreated,
      warranty,
      price,
      isAvailable,
    });
    await product.save();
    res.redirect("/products/view");
  } catch (err) {
    res.status(400).send("Error adding product");
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
