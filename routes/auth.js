const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// إنشاء حساب جديد
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, "123hh214", {
      expiresIn: "30d",
    });
    res.status(201).json({ token });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

// تسجيل الدخول
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, "123hh214", {
      expiresIn: "30d",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

module.exports = router;
