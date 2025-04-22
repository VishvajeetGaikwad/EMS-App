import React, { useState } from "react";
import axios from "axios";
import {
  FaAssistiveListeningSystems,
  FaRocketchat,
  FaTasks,
} from "react-icons/fa"; // Example icon (you can use your own logo or image)
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "High", // Set the default priority to "High"
    assignedTo: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure token is present before sending request
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in. Please log in first.");
      return;
    }

    try {
      // Send POST request with task data and authorization token
      const res = await axios.post(
        "http://localhost:5000/api/tasks/assign",
        taskData,
        {
          headers: {
            "x-auth-token": token, // Include the token for authorization
          },
        }
      );

      toast.success("Task assigned successfully!");
      console.log("Task response:", res.data);

      // Reset the form
      setTaskData({
        title: "",
        description: "",
        deadline: "",
        priority: "High", // Reset to High after submission
        assignedTo: "",
      });
    } catch (err) {
      toast.error("Error assigning task:", err);
      toast.error("Failed to assign task. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <div className="flex items-center justify-center mb-6">
        {/* Logo or Icon */}
        <FaAssistiveListeningSystems className="text-4xl text-green-600 mr-4" />{" "}
        {/* Icon from react-icons */}
        <h2 className="text-center text-3xl font-bold text-black mb-6">
          Update Employee
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Title */}
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Task Description */}
        <textarea
          name="description"
          placeholder="Task Description"
          value={taskData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Task Deadline */}
        <input
          type="date"
          name="deadline"
          value={taskData.deadline}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Task Priority */}
        <select
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Assign to Employee */}
        <input
          type="text"
          name="assignedTo"
          placeholder="Assign to Employee ID"
          value={taskData.assignedTo}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default AssignTask;
