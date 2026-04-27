const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const user = await User.create({ username, password });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: "Wrong username or password" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;