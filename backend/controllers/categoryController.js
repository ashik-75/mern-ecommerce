const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const mongoose = require("mongoose");

const addCategory = asyncHandler(async (req, res) => {
  if (req.body.name) {
    const category = await Category.create({ name: req.body.name });
    res.json(category);
  } else {
    res.status(400);
    throw new Error("Something Wrong Happen");
  }
});

const getAllCategory = asyncHandler(async (req, res) => {
  console.log("request fell");
  const categories = await Category.find();

  res.json(categories);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await category.deleteOne();

    res.json({
      messge: "delete completed",
    });
  } else {
    res.status(404);
    throw new Error("category not found");
  }
});

const editCategory = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const category = await Category.findById(req.params.id);
    if (category) {
      category.name = req.body.name || category.name;
      await category.save();

      res.json(category);
    } else {
      res.status(404);
      throw new Error("not found");
    }
  } else {
    res.status(401);
    throw new Error("Wrong id");
  }
});

module.exports = { addCategory, getAllCategory, deleteCategory, editCategory };
