import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetSingleEmployee = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [message, setMessage] = useState("");

  // Function to fetch employee details by ID
  const fetchEmployee = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://ems-app-xwgf.onrender.com/api/employees/${id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setEmployeeData(response.data);
      setMessage(""); // Clear any previous messages
    } catch {
      toast.error("Error fetching employee details. Please check the ID.");
      setEmployeeData(null); // Reset data if there's an error
    }
  };

  // Handle ID input change
  const handleIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        👤 Get Employee Details
      </h2>

      {/* Message display */}
      {message && (
        <div
          className="text-center text-white font-medium py-3 rounded-lg mb-5 transition-all duration-300"
          style={{
            backgroundColor: message.includes("Error") ? "#EF4444" : "#10B981",
          }}
        >
          {message}
        </div>
      )}

      {/* Employee ID input */}
      <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
        <label
          htmlFor="employeeId"
          className="block text-lg font-semibold text-gray-700 mb-2"
        >
          Employee ID
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          id="employeeId"
          value={employeeId}
          onChange={handleIdChange}
          placeholder="Enter employee ID"
        />
        <button
          onClick={() => fetchEmployee(employeeId)}
          className="w-full mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Fetch Employee Data
        </button>
      </div>

      {/* Display employee details */}
      {employeeData && (
        <div className="mt-8 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            📄 Employee Details
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Name:</strong> {employeeData.name}
            </li>
            <li>
              <strong>Email:</strong> {employeeData.email}
            </li>
            <li>
              <strong>Phone:</strong> {employeeData.phone}
            </li>
            <li>
              <strong>Department:</strong> {employeeData.department}
            </li>
            <li>
              <strong>Position:</strong> {employeeData.position}
            </li>
            <li>
              <strong>Salary:</strong> ₹{employeeData.salary}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetSingleEmployee;
