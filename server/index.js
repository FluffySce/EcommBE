import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.mongodb_uri)
  .then(() => {
    console.log("MongoDB connected sucessfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb not connected", err);
  });
