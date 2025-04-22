// routes/taskRoutes.js
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/Auth");
const { isAdmin } = require("../utils/RoleCheck");
const Task = require("../models/Task");
const User = require("../models/User");
// Assign Task - Admin/Manager
router.post("/assign", auth, async (req, res) => {
  try {
    if (!isAdmin(req.user)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { title, description, assignedTo, priority, deadline, status } =
      req.body;

    // Validate required fields
    if (!title || !description || !assignedTo || !deadline) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new task with default values for priority and status
    const newTask = new Task({
      title,
      description,
      assignedTo,
      priority: priority || "Medium",
      status: status || "Not Started",
      deadline,
      assignedBy: req.user._id,
    });

    await newTask.save();
    console.log("Task assigned successfully:", newTask);
    res.status(201).json({
      message: "Task assigned successfully",
      task: newTask,
    });
  } catch (err) {
    console.error("Error assigning task:", err.message);
    res.status(500).json({ message: "Error assigning task" });
  }
});

// Route 1: EMPLOYEE — Get own tasks
router.get("/my-tasks", auth, async (req, res) => {
  try {
    const employeeId = req.user.id;

    // Ensure the user is not an admin
    if (req.user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Admins cannot access this route." });
    }

    const tasks = await Task.find({ assignedTo: employeeId }).sort({
      deadline: 1,
    });

    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tasks found for this employee." });
    }

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching employee tasks:", err);
    res.status(500).json({ message: "Server error fetching tasks." });
  }
});

// Route 2: ADMIN — Get specific employee's tasks by ID
router.get("/employee/:id/tasks", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const tasks = await Task.find({ assignedTo: id }).sort({ deadline: 1 });

    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tasks found for this employee." });
    }

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching specific employee tasks:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// Search tasks by employee name (for admin)
router.get("/search-by-name", auth, async (req, res) => {
  const { name } = req.query;

  try {
    const tasks = await Task.find()
      .populate({
        path: "assignedTo",
        match: { name: new RegExp(name, "i") }, // case-insensitive name match
        select: "name", // only fetch name
      })
      .exec();

    // Filter out tasks where no match occurred
    const filteredTasks = tasks.filter((task) => task.assignedTo !== null);

    res.json(filteredTasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tasks by employee name" });
  }
});

// Update Task Status (by employee)
router.patch("/:taskId/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    // Check if the user is an admin or an employee
    if (req.user.role === "admin") {
      // Admin can update any task, no additional checks needed
    } else if (task.assignedTo.toString() !== req.user.id) {
      // Employee can only update their own task
      return res
        .status(403)
        .json({ message: "Unauthorized to update this task" });
    }

    // Validate assignedTo field for employee task
    if (!task.assignedTo || !mongoose.Types.ObjectId.isValid(task.assignedTo)) {
      return res
        .status(400)
        .json({ message: "Invalid or missing assigned employee" });
    }

    // Update task status
    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).json({ message: "Error updating task status" });
  }
});

// Fetch all tasks - Admin only
router.get("/all-tasks", auth, async (req, res) => {
  try {
    // Check if the logged-in user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Fetch all tasks with pagination (optional)
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    const tasks = await Task.find()
      .populate("assignedTo", "name email role")
      .skip(skip)
      .limit(limit)
      .sort({ deadline: 1 });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

module.exports = router;
