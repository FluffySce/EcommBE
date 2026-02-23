import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import path from "path";

const app = express();
// serve static files from the 'public directory
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.json());
app.use(cors());

//parsing form data
app.use(express.urlencoded({ extended: true }));

//seting up EJS
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

app.get("/", (req, res) => {
  res.send("Ecommerce server is running");
});
//product related routes
app.use("/products", productRoutes);

//reviews related
app.use("/reviews", reviewRoutes);

export default app;
