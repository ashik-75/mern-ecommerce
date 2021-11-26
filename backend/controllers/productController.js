const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const getAllProducts = async (req, res) => {
  const products = await Product.find().sort({ updatedAt: -1 });
  res.send(products);
};

const addProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({ user: req.user._id, ...req.body });
  res.status(200).json(product);
});

const removeProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({
    message: "delete successfull",
  });
});

const updateProduct = async (req, res) => {
  const { title, price, image, category, description } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.title = title || product.title;
    product.price = price || product.price;
    product.category = category || product.category;
    product.image = image || product.image;
    product.description = description || product.description;
    await product.save();
    res.json("product update");
  } else {
    res.status(404);
    throw new Error("Product not found here");
  }
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  removeProduct,
  updateProduct,
};
