const express = require("express");
const Video = require("../models/Vedio");
const Course = require("../models/Course");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// إضافة فيديو لكورس
router.post("/:courseId", protect, async (req, res) => {
  const { title, description } = req.body;
  const course = await Course.findById(req.params.courseId);

  if (course.user.toString() !== req.body.id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const video = new Video({ title, description, course: req.params.courseId });
  await video.save();

  course.videos.push(video);
  await course.save();

  res.status(201).json(video);
});

// إضافة تعليق على فيديو
router.post("/:videoId/comments", protect, async (req, res) => {
  const video = await Video.findById(req.params.videoId);

  const comment = {
    content: req.body.content,
    user: req.body.id,
  };

  video.comments.push(comment);
  await video.save();

  res.status(201).json(video.comments);
});

module.exports = router;
