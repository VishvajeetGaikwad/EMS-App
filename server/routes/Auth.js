const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");

const router = express.Router();

// ===============================
// Signup Route
// ===============================
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if email is already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // Create and save new user
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Server error!" });
  }
});

// ===============================
// Login Route
// ===============================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find either employee or user by email
    let user = await Employee.findOne({ email }); // First check in Employee model
    if (!user) {
      user = await User.findOne({ email }); // If not found, check in User model
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Include role in the token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response with user details
    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Include the role (employee or admin) in the response
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error!" });
  }
});

module.exports = router;
