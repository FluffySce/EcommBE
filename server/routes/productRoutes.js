import express from "express";
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";
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

// View a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.render("products/view", { product });
  } catch (err) {
    res.status(500).send("Error loading product");
  }
});

//edit form rende
router.get("/:id/edit", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.render("products/edit", { product });
  } catch (err) {
    res.status(400).send("Error loading product");
  }
});

// updating content after edit - patch
router.patch("/:id", async (req, res) => {
  try {
    const { name, dateCreated, warranty, price } = req.body;
    const isAvailable = req.body.isAvailable === "on";
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    product.name = name;
    product.dateCreated = dateCreated;
    product.warranty = warranty;
    product.price = price;
    product.isAvailable = isAvailable;
    await product.save();
    res.redirect("/products/view");
  } catch (err) {
    res.status(400).send("Error updating product");
  }
});

// Render reviews page for a product
router.get("/:id/reviews", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    const reviews = await Review.find({ product: product._id });
    res.render("products/reviews", { product, reviews });
  } catch (err) {
    res.status(500).send("Error loading reviews");
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
