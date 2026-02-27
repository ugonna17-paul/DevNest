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

// Load environment variables
dotenv.config();

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(cors());
app.use(express.json());

// Static files (payment uploads)
app.use("/uploads", express.static("uploads"));

/* ======================
   HEALTH CHECK ROUTE
   (Render uses this)
====================== */
app.get("/", (req, res) => {
  res.status(200).json({
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
      payment: "/api/payment",
    },
  });
});

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/run-code", playgroundRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/payment", paymentRoutes);

/* ======================
   ERROR HANDLER (LAST)
====================== */
app.use(errorHandler);

/* ======================
   SERVER START (RENDER SAFE)
====================== */
const PORT = process.env.PORT || 5008;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

startServer();