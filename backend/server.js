import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRouter from "./routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  connectDb();
  console.log(`The Server is listening on Port ${PORT}`);
});
