import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateTaskStatus = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusUpdate, setStatusUpdate] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://ems-app-xwgf.onrender.com/api/tasks/all-tasks",
        {
          headers: { "x-auth-token": token },
        }
      );
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (e, taskId) => {
    const updatedStatus = e.target.value;
    setStatusUpdate((prev) => ({
      ...prev,
      [taskId]: updatedStatus,
    }));
  };

  const handleSingleUpdate = async (taskId) => {
    const updatedStatus = statusUpdate[taskId];
    if (!updatedStatus) return;

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `https://ems-app-xwgf.onrender.com/api/tasks/${taskId}/status`,
        { status: updatedStatus },
        { headers: { "x-auth-token": token } }
      );

      await fetchTasks();
      setStatusUpdate((prev) => {
        const updated = { ...prev };
        delete updated[taskId];
        return updated;
      });
      toast.success("Status updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold mb-8 text-black text-center">
        📝 Update Task Status
      </h2>

      {loading && <p className="text-blue-500 mb-4">Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      {tasks.length === 0 && !loading && (
        <p className="text-gray-500 text-center">No tasks found.</p>
      )}

      {/* Grid for Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-xl shadow-lg p-6 border hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              {task.title}
            </h3>
            <p className="mb-2">
              <strong>Current Status:</strong> {task.status}
            </p>

            <div className="flex flex-col gap-3 mt-3">
              <select
                value={statusUpdate[task._id] || task.status}
                onChange={(e) => handleStatusChange(e, task._id)}
                className="border px-4 py-2 rounded-lg"
              >
                <option value="Not Started">Pending</option>
                <option value="Working on it">Working on it</option>
                <option value="Completed">Completed</option>
                <option value="Will be delayed">Will be delayed</option>
              </select>

              <button
                type="button"
                onClick={() => handleSingleUpdate(task._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateTaskStatus;
