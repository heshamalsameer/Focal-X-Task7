const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
// Routes
const userRoutes = require("./routes/auth");
const coursRoutes = require("./routes/courses");
const vedioRoutes = require("./routes/videos");

app.use("/api/auth", userRoutes);
app.use("/api/courses", coursRoutes);
app.use("/api/videos", vedioRoutes);

// اتصال بقاعدة البيانات
mongoose
  .connect("mongodb://localhost:27017/courses", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
