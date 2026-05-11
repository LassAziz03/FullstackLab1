const express = require("express");

const {
  createCategory,
  getCategories,
  getCategoriesByUser
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/", createCategory);

router.get("/", getCategories);

router.get("/user/:userId", getCategoriesByUser);

module.exports = router;