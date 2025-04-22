import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateEmployeeTask = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/tasks/my-tasks",
          {
            headers: { "x-auth-token": token },
          }
        );
        setTasks(response.data);
      } catch {
        toast.error("⚠️ Failed to load tasks.");
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const task = tasks.find((t) => t._id === selectedTaskId);
    if (task) {
      setSelectedTask(task);
      setStatus(task.status || "");
      setError("");
      setSuccess("");
    }
  }, [selectedTaskId, tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedTaskId || !status) {
      toast.error("⚠️ Please select a task and status.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/tasks/${selectedTaskId}/status`,
        { status },
        {
          headers: { "x-auth-token": token },
        }
      );
      toast.success("✅ Task status updated successfully!");
    } catch {
      toast.error("❌ Error updating task status");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🛠️ Update Employee Task
      </h2>

      <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Select Task
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedTaskId}
          onChange={(e) => setSelectedTaskId(e.target.value)}
        >
          <option value="">-- Choose a task --</option>
          {tasks.map((task) => (
            <option key={task._id} value={task._id}>
              {task.title}
            </option>
          ))}
        </select>
      </div>

      {selectedTask && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200"
        >
          <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            📋 Task Details
          </h4>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>
              <strong>Title:</strong> {selectedTask.title}
            </li>
            <li>
              <strong>Description:</strong> {selectedTask.description}
            </li>
          </ul>

          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-indigo-400"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Working on it">Working on it</option>
              <option value="Completed">Completed</option>
              <option value="Will be delayed">Will be delayed</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}

          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200"
          >
            ✅ Update Status
          </button>
        </form>
      )}

      {!selectedTask && !error && tasks.length > 0 && (
        <p className="text-center text-gray-500 mt-4">
          📌 Please select a task above.
        </p>
      )}

      {!selectedTask && tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          📭 No tasks assigned yet.
        </p>
      )}
    </div>
  );
};

export default UpdateEmployeeTask;
