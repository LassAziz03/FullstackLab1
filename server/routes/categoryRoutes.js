const express = require("express");
const Category = require("../models/category");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.params.userId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;