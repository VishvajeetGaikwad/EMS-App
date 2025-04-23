import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://ems-app-pcl7.onrender.com/api/employees/me",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setEmployee(response.data);
      } catch {
        setError("❌ Failed to load employee details.");
      }
    };

    fetchEmployeeDetails();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        👤 Employee Profile
      </h2>

      <div className="bg-gradient-to-br from-gray-50 to-white shadow-xl border border-gray-200 rounded-2xl p-8">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {employee ? (
          <div className="flex flex-col items-center space-y-6">
            {/* Avatar */}
            <img
              src="https://i.pravatar.cc/120"
              alt="avatar"
              className="w-28 h-28 rounded-full shadow-md border-2 border-blue-500"
            />

            {/* Name & Position */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800">
                {employee.name}
              </h3>
              <p className="text-gray-500">{employee.position}</p>
            </div>

            {/* Details Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 text-gray-800">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  📧 Email
                </label>
                <div className="bg-gray-100 p-3 rounded-lg">
                  {employee.email}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  📞 Phone
                </label>
                <div className="bg-gray-100 p-3 rounded-lg">
                  {employee.phone}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  🏢 Department
                </label>
                <div className="bg-gray-100 p-3 rounded-lg">
                  {employee.department}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  🧑‍💼 Position
                </label>
                <div className="bg-gray-100 p-3 rounded-lg">
                  {employee.position}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  💰 Salary
                </label>
                <div className="bg-gray-100 p-3 rounded-lg">
                  ₹{employee.salary}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">🔄 Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;
