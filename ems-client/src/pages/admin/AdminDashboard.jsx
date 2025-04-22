import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  VideoCameraIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  HeartIcon,
} from "@heroicons/react/outline";

const Dashboard = () => {
  const totalEmployees = 120;
  const pendingTasks = 15;
  const completedTasks = 80;
  const announcements = [
    "New update for employee management module 🚀",
    "Holiday announcement: Office closed on Friday 🎉",
  ];

  const dashboardStats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      color: "from-blue-200 to-blue-100 text-blue-900 border-blue-400",
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      color: "from-yellow-200 to-yellow-100 text-yellow-900 border-yellow-400",
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      color: "from-green-200 to-green-100 text-green-900 border-green-400",
    },
  ];

  const employeeActions = [
    {
      title: "Create Employee",
      to: "/add-employee",
    },
    { title: "Update Employee", to: "/update-employee" },
    { title: "Delete Employee", to: "/delete-employee" },
    { title: "Get Single Employee", to: "/getsingle-employee" },
    { title: "Get All Employees", to: "/getall-employee" },
  ];

  const taskActions = [
    { title: "Assign Task", to: "/assign-task" },
    { title: "Get Specific Task", to: "/get-specific-task" },
    { title: "Update Task Status", to: "/update-task" },
    { title: "View All Tasks", to: "/view-task" },
  ];

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const sidebarLinks = [
    {
      icon: <VideoCameraIcon className="w-8 h-8 mx-auto" />,
      to: "/conduct-meeting",
    },
    {
      icon: <PaperAirplaneIcon className="w-8 h-8 mx-auto" />,
      to: "/team-chat",
    },
    {
      icon: <CheckCircleIcon className="w-8 h-8 mx-auto" />,
      to: "/leave-request",
    },
    { icon: <HeartIcon className="w-8 h-8 mx-auto" />, to: "/fun-zone" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-8">
      {/* Welcome */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-md">
          Welcome, Vishwajit! 🎯
        </h1>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-28 right-16 p-6 text-blue-400 text-6xl font-bold rounded-full shadow-none hover:text-blue-700 transition-all duration-300 transform hover:scale-125 hover:translate-y-[-10px]"
      ></button>

      {/* Floating Sidebar */}
      <div
        className={`${
          sidebarVisible ? "translate-y-0" : "translate-y-full"
        } fixed right-16 top-64 w-16 h-16 text-blue-400 text-6xl font-bold rounded-full shadow-none hover:text-blue-700 transition-all duration-300 transform hover:scale-125 hover:translate-y-[-10px]`}
      >
        <div className="space-y-4">
          {sidebarLinks.map((link, idx) => (
            <Link
              to={link.to}
              key={idx}
              className="block text-center p-4 text-blue-400 text-6xl font-bold rounded-full shadow-none hover:text-blue-700 transition-all duration-300 transform hover:scale-125 hover:translate-y-[-10px]"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white p-5 rounded-xl shadow-md max-w-5xl mx-auto border-l-4 border-blue-600 mb-10">
        <h2 className="text-xl font-semibold text-blue-700 mb-3">
          📢 Announcements
        </h2>
        <div className="space-y-2">
          {announcements.map((msg, i) => (
            <div
              key={i}
              className="bg-blue-50 px-4 py-2 rounded-lg border-l-4 border-blue-400 hover:bg-blue-100"
            >
              <p className="text-gray-700 text-sm">{msg}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mb-12">
        {dashboardStats.map((card, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${card.color} border rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all`}
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="text-4xl font-extrabold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Employee Ops */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          👥 Employee Operations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {employeeActions.map((action, idx) => (
            <Link to={action.to} key={idx}>
              <div className="bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-300 rounded-xl p-6 text-center shadow-md hover:shadow-xl hover:scale-[1.02] transition-all">
                <h2 className="text-xl font-semibold text-blue-800">
                  {action.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Task Ops */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          ✅ Task Operations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {taskActions.map((action, idx) => (
            <Link to={action.to} key={idx}>
              <div className="bg-gradient-to-r from-green-100 to-green-50 border border-green-300 rounded-xl p-6 text-center shadow-md hover:shadow-xl hover:scale-[1.02] transition-all">
                <h2 className="text-xl font-semibold text-green-800">
                  {action.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
