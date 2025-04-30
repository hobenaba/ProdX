import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRouter from "./routes/product.routes.js";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}
app.listen(PORT, () => {
  connectDb();
  console.log(`The Server is listening on Port ${PORT}`);
});
