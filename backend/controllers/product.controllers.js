import mongoose from "mongoose";
import { Product } from "../models/product.model.js";

export const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server Error : ${error.message}.` });
  }
};
export const createProduct = async (req, res) => {
  const newProduct = req.body;

  if (!newProduct.name || !newProduct.price || !newProduct.image)
    res
      .status(400)
      .json({ success: false, message: "Please Enter all Fields." });

  try {
    const product = new Product(newProduct);
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server Error : ${error.message}.` });
  }
};

export const updateProduct = async (req, res) => {
  const updatedProduct = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ success: false, message: "Product Not Found." });

  try {
    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image)
      res
        .status(400)
        .json({ success: false, message: "Please Enter all Fields." });
    const document = await Product.findOneAndUpdate(
      { _id: id },
      updatedProduct,
      {
        new: true,
      }
    );
    if (!document)
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found." });

    return res.status(200).json({ success: true, data: document });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server Error : ${error.message}.` });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ success: false, message: "Product Not Found." });

  try {
    const document = await Product.findOneAndDelete({ _id: id });
    if (!document)
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found." });

    return res
      .status(200)
      .json({ success: true, message: "Product was Deleted Successffully." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server Error : ${error.message}.` });
  }
};
