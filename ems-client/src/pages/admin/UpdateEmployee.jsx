import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: "",
  });

  const [employeeId, setEmployeeId] = useState("");
  const [setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEmployee = async (id) => {
    setLoading(true);
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
      setMessage("");
    } catch {
      toast.error("❌ Error fetching employee details. Please check the ID.");
    } finally {
      setLoading(false);
    }
  };

  const handleIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://ems-app-xwgf.onrender.com/api/employees/${employeeId}`,
        employeeData,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      toast.success("✅ Employee updated successfully!");
    } catch {
      toast.error("❌ Error updating employee.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🛠️ Update Employee
        </h2>

        <div className="mb-6">
          <label
            htmlFor="employeeId"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Employee ID
          </label>
          <div className="flex">
            <input
              type="text"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              id="employeeId"
              value={employeeId}
              onChange={handleIdChange}
              placeholder="Enter employee ID"
            />
            <button
              type="button"
              className="bg-indigo-600 text-white font-semibold px-5 rounded-r-xl hover:bg-indigo-700 transition-all"
              onClick={() => fetchEmployee(employeeId)}
            >
              Fetch
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center my-6">
            <ClipLoader color="#4F46E5" size={45} />
          </div>
        )}

        {employeeId && !loading && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              {[
                "name",
                "email",
                "phone",
                "department",
                "position",
                "salary",
              ].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                  >
                    {field}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={employeeData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 text-white py-3 font-bold rounded-xl hover:bg-indigo-700 transition-all"
            >
              ✏️ Update Employee
            </button>
          </form>
        )}

        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default UpdateEmployee;
