import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://ems-app-xwgf.onrender.com/api/tasks/my-tasks",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setTasks(res.data);
      setError("");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        toast.error("Something went wrong while fetching tasks.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-200 text-red-800 border-red-300";
      case "medium":
        return "bg-yellow-200 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-200 text-green-800 border-green-300";
      default:
        return "bg-gray-200 text-gray-800 border-gray-300";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 drop-shadow-sm">
        📝 Your Assigned Tasks
      </h2>

      {loading ? (
        <div className="text-center text-lg text-blue-600 font-semibold animate-pulse">
          Fetching your tasks...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      ) : tasks.length === 0 ? (
        <div className="text-center text-gray-600 font-medium">
          You currently have no assigned tasks 📭
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="backdrop-blur-md bg-white/70 border border-gray-200 rounded-2xl shadow-xl p-6 transition-all hover:scale-[1.02] hover:shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-2">
                📌 {task.title}
              </h3>
              <p className="text-gray-700 text-sm mb-4">{task.description}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  🗓️ <strong>Deadline:</strong>{" "}
                  {new Date(task.deadline).toLocaleDateString()}
                </p>
                <p>
                  🚦 <strong>Priority:</strong>{" "}
                  <span
                    className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </p>
                <p>
                  📍 <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedTasks;
