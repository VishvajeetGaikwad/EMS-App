import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: "",
  });

  const [employeeId, setEmployeeId] = useState("");

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
      toast.success("✅ Employee data fetched successfully!");
    } catch {
      toast.error("❌ Error fetching employee details. Please check the ID.");
    }
  };

  const handleIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete employee "${employeeData.name}"?`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://ems-app-xwgf.onrender.com/api/employees/${employeeId}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      toast.success("✅ Employee deleted successfully!");
      setEmployeeData({
        name: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        salary: "",
      });
      setEmployeeId("");
    } catch {
      toast.error("❌ Error deleting employee. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🗑️ Delete Employee
      </h2>

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

      {employeeData.name && (
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

          <button
            onClick={handleDelete}
            className="w-full mt-6 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
          >
            🗑️ Delete Employee
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteEmployee;
