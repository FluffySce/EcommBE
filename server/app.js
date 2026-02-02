import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Ecommerce server is running");
});

app.use("/products", productRoutes);

export default app;
