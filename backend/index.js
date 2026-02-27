const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const progressRoutes = require("./routes/progressRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const playgroundRoutes = require("./routes/playgroundRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Import error handler
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());

// Body parser middleware
app.use(express.json());

// Static files for payment proof images
app.use("/uploads", express.static("uploads"));

// Routes
app.get("/", (req, res) => {
  res.json({ 
    message: "DevNest API Running",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      courses: "/api/courses",
      modules: "/api/modules",
      lessons: "/api/lessons",
      progress: "/api/progress",
      dashboard: "/api/dashboard",
      playground: "/api/run-code",
      feedback: "/api/feedback",
      payment: "/api/payment"
    }
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/run-code", playgroundRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/payment", paymentRoutes);

// Error handler middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5008;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}`);
});
