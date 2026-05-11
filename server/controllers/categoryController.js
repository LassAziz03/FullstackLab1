const Category = require("../models/category");

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoriesByUser = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.params.userId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoriesByUser
};