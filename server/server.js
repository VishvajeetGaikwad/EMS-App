const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Make sure this is placed before routes

// Routes
const authRoutes = require("./routes/Auth");
app.use("/api/auth", authRoutes);

const employeeRoutes = require("./routes/EmployeRoutes"); // ✅ Check file name here
app.use("/api/employees", employeeRoutes); // Correct route path

const taskRoutes = require("./routes/taskRoutes"); // ✅ Add this
app.use("/api/tasks", taskRoutes); // ✅ Mount the task routes

// Test route
app.get("/api/ping", (req, res) => {
  res.json({ message: "Backend is working! 🟢" });
});

// Connect MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Ensure this is enabled
  })
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error ❌", err));
