import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://ems-app-pcl7.onrender.com/api/tasks/all-tasks",
          {
            headers: { "x-auth-token": token },
          }
        );
        setTasks(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <span className="text-blue-500 font-semibold text-lg animate-pulse">
          Loading tasks...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center mt-6">
        <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg shadow">
          {error}
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        📝 All Assigned Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                {task.title}
              </h3>
              <p className="text-gray-700 mb-4">{task.description}</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  <strong>Deadline:</strong>{" "}
                  {new Date(task.deadline).toLocaleDateString()}
                </li>
                <li>
                  <strong>Priority:</strong> {task.priority}
                </li>
                <li>
                  <strong>Status:</strong> {task.status}
                </li>
                <li>
                  <strong>Assigned To:</strong>{" "}
                  {task.assignedTo?.name || "Unassigned"}
                </li>
                <li>
                  <strong>Email:</strong> {task.assignedTo?.email || "N/A"}
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllTasks;
