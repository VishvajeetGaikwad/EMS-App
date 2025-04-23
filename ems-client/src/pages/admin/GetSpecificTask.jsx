import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetSpecificTask = () => {
  const [searchType, setSearchType] = useState("id");
  const [searchValue, setSearchValue] = useState("");
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchValue("");
    setTaskData(null);
    setError("");
  };

  const handleValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTaskData(null);

    try {
      const token = localStorage.getItem("token");
      let res;

      if (searchType === "id") {
        if (!isValidObjectId(searchValue)) {
          toast.error("Please enter a valid 24-character Employee ID.");
          setLoading(false);
          return;
        }

        res = await axios.get(
          `http://localhost:5000api/tasks/employee/${searchValue}/tasks`,
          {
            headers: { "x-auth-token": token },
          }
        );
        setTaskData(res.data);
      } else {
        res = await axios.get(
          `http://localhost:5000/api/tasks/search-by-name?name=${encodeURIComponent(
            searchValue
          )}`,
          {
            headers: { "x-auth-token": token },
          }
        );
        setTaskData(res.data);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Failed to fetch task(s). Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-center text-black mb-6">
        🔍 Admin Task Lookup
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md"
      >
        <div className="flex gap-4 items-center">
          <select
            value={searchType}
            onChange={handleSearchTypeChange}
            className="w-1/3 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="id">Employee ID</option>
            <option value="name">Employee Name</option>
          </select>

          <input
            type="text"
            placeholder={
              searchType === "id"
                ? "Enter Employee ID (24-char)"
                : "Enter Employee Name"
            }
            value={searchValue}
            onChange={handleValueChange}
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:scale-[1.01] transition-all"
        >
          {loading
            ? "Searching..."
            : `Get Task${searchType === "name" ? "s" : ""}`}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600 text-center font-medium">{error}</p>
      )}

      {taskData && taskData.length > 0 && (
        <div className="mt-8 space-y-6">
          {taskData.map((task, index) => (
            <div
              key={task._id || index}
              className="bg-white border-l-4 border-green-500 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2">
                📌 Task {index + 1}
              </h3>
              <div className="text-gray-700 space-y-1">
                <p>
                  <strong>Title:</strong> {task.title}
                </p>
                <p>
                  <strong>Description:</strong> {task.description}
                </p>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
                <p>
                  <strong>Assigned To:</strong> {task.employee?.name}
                </p>
                <p>
                  <strong>Due Date:</strong>{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {taskData && taskData.length === 0 && !loading && (
        <p className="mt-6 text-center text-yellow-600 font-medium">
          No tasks found for the provided input.
        </p>
      )}
    </div>
  );
};

export default GetSpecificTask;
