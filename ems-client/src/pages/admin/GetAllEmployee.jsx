import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetAllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://ems-app-xwgf.onrender.com/api/employees",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        // Access employees from the response
        const employeesData = response.data.employees;

        if (Array.isArray(employeesData)) {
          setEmployees(employeesData);
        } else {
          setEmployees([]);
        }
        setMessage(""); // Clear any previous messages
      } catch {
        toast.error("Error fetching employees.");
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        👥 All Employees
      </h2>

      {/* Message display */}
      {message && (
        <div
          className="text-center text-white font-medium py-3 rounded-lg mb-6 transition-all duration-300"
          style={{
            backgroundColor: "#EF4444", // Error message color
          }}
        >
          {message}
        </div>
      )}

      {/* Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.length === 0 ? (
          <div className="col-span-full text-center text-gray-700">
            <p>No employees found!</p>
          </div>
        ) : (
          employees.map((employee) => (
            <div
              key={employee._id}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <div className="p-6">
                <h5 className="text-xl font-semibold text-center text-gray-800 mb-4">
                  {employee.name}
                </h5>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> {employee.email}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> {employee.phone}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Department:</strong> {employee.department}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Position:</strong> {employee.position}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Salary:</strong> ₹{employee.salary}
                </p>
              </div>
              <div className="bg-gray-50 p-4 text-center">
                <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GetAllEmployees;
