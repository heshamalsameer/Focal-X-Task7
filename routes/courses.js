const express = require("express");
const Course = require("../models/Course");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// إضافة كورس جديد
router.post("/", protect, async (req, res) => {
  const { title, description, duration, id } = req.body;
  console.log(req);

  const course = new Course({
    title,
    description,
    duration,
    user: id,
    // user: req.user._id,
  });
  await course.save();
  res.status(201).json(course);
});

// تعديل كورس
router.put("/:id", protect, async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course.user.toString() !== req.body.id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  course.title = req.body.title || course.title;
  course.description = req.body.description || course.description;
  course.duration = req.body.duration || course.duration;

  await course.save();
  res.json(course);
});

module.exports = router;
