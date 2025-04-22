const express = require("express");
const Employee = require("../models/Employee");
const auth = require("../middleware/Auth"); // Import the auth middleware
const { isAdmin } = require("../utils/RoleCheck"); // Import role checking utility

const router = express.Router();

// ✅ Create new employee (POST) - Admin only
router.post("/", auth, async (req, res) => {
  try {
    // Allow only admin users to create an employee
    if (!isAdmin(req.user)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { name, email, department, position, salary, phone, password, role } =
      req.body;

    // Check if the employee already exists
    const existing = await Employee.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Employee with this email already exists" });
    }

    const newEmployee = new Employee({
      name,
      email,
      department,
      position,
      salary,
      phone,
      password,
      role,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ message: "Error creating employee" });
  }
});

// ✅ Get all employees with filters and pagination (GET)
router.get("/", auth, async (req, res) => {
  const { name, email, department, position, page = 1, limit = 10 } = req.query;

  let filter = {};

  // Dynamically add filters based on query parameters
  if (name) {
    filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }
  if (email) {
    filter.email = { $regex: email, $options: "i" }; // Case-insensitive search
  }
  if (department) {
    filter.department = { $regex: department, $options: "i" }; // Case-insensitive search
  }
  if (position) {
    filter.position = { $regex: position, $options: "i" }; // Case-insensitive search
  }

  try {
    const employees = await Employee.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Employee.countDocuments(filter);

    res.status(200).json({
      employees,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// GET /employees/me (employee only)
router.get("/me", auth, async (req, res) => {
  try {
    if (req.user.role !== "employee") {
      return res
        .status(403)
        .json({ message: "Access denied. Employees only." });
    }

    const employee = await Employee.findById(req.user.id).select(
      "name email department position role salary phone"
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (err) {
    console.error("Error fetching employee details:", err);
    res.status(500).json({ message: "Error fetching employee details" });
  }
});

// ✅ Get single employee by ID (GET)
router.get("/:id", auth, async (req, res) => {
  try {
    // Check if the user is an admin or the employee is requesting their own data
    if (req.user.role !== "admin" && req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ message: "Error fetching employee" });
  }
});

// ✅ Update employee details (PUT) - Admin only
const mongoose = require("mongoose");

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, department, position, salary } = req.body;

  try {
    // Check if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Ensure only admin can update
    if (!isAdmin(req.user)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update employee details
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.phone = phone || employee.phone;
    employee.department = department || employee.department;
    employee.position = position || employee.position;
    employee.salary = salary || employee.salary;

    await employee.save();
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ message: "Error updating employee" });
  }
});

// ✅ Delete employee details (DELETE) - Admin only
router.delete("/:id", auth, async (req, res) => {
  try {
    // Ensure only admin can delete
    if (!isAdmin(req.user)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Delete the employee
    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ message: "Error deleting employee" });
  }
});
/// GET /employees (admin only)
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const employees = await Employee.find();
    if (!employees.length) {
      return res.status(404).json({ message: "No employees found" });
    }

    res.status(200).json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ message: "Error fetching employees" });
  }
});

module.exports = router;
