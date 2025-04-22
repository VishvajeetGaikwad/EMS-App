const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date, required: true },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Not Started", "Working on it", "Completed", "Will be delayed"],
      default: "Task Assigned",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId, // Make sure this is ObjectId
      ref: "Employee", // Reference to the Empoyee model
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ CommonJS export
module.exports = mongoose.model("Task", taskSchema);
