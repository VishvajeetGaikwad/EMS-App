import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ This file **does exist** in the package

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    position: "",
    salary: "",
    role: "",
  });

  const [message, setMessage] = useState(""); // State for showing messages

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message on each form submit

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Authentication required. Please log in.");
        return;
      }

      await axios.post("https://ems-app-pcl7.onrender.com/api/employees", employeeData, {
        headers: {
          "x-auth-token": token,
        },
      });

      toast.success("🎉 Employee added successfully!");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          if (data.message && data.message.includes("email")) {
            toast.error(data.message); // Show backend error message (like "Email already exists")
          } else {
            toast.error("Invalid data. Please check and try again.");
          }
        } else if (status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("Unexpected error. Please try again.");
        }
      } else {
        toast.error("Network error or server unavailable.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-black mb-6">
          Add New Employee
        </h2>

        {/* Show message here */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center ${
              message.includes("success")
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input fields and select dropdowns */}
          <div className="space-y-6">
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />
            <input
              type="text"
              name="phone"
              value={employeeData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />

            {/* Department Dropdown */}
            <select
              name="department"
              value={employeeData.department}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            >
              <option value="">Select Department</option>
              <option value="HR">Human Resources</option>
              <option value="Sales">Sales</option>
              <option value="Engineering">Engineering</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Customer Support">Customer Support</option>
              <option value="IT">IT</option>
              <option value="Legal">Legal</option>
            </select>

            {/* Position Dropdown */}
            <select
              name="position"
              value={employeeData.position}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            >
              <option value="">Select Position</option>
              <option value="Intern">Intern</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Manager">Manager</option>
              <option value="HR Executive">HR Executive</option>
              <option value="Sales Executive">Sales Executive</option>
            </select>

            {/* Role Dropdown */}
            <select
              name="role"
              value={employeeData.role}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            >
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
            </select>

            <input
              type="number"
              name="salary"
              value={employeeData.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />

            <input
              type="password"
              name="password"
              value={employeeData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 text-white rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
