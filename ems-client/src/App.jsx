import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./layout/MainLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/admin/Login";
import AssignTask from "./pages/admin/AssignTask";
import GetSpecificTask from "./pages/admin/GetSpecificTask";
import UpdateTaskStatus from "./pages/admin/UpdateTaskStatus";
import ViewAllTasks from "./pages/admin/ViewAllTasks";
import AddEmployee from "./pages/admin/AddEmployee";
import UpdateEmployee from "./pages/admin/UpdateEmployee";
import DeleteEmployee from "./pages/admin/DeleteEmployee";
import GetSingleEmployee from "./pages/admin/GetSingleEmployee";
import GetAllEmployee from "./pages/admin/GetAllEmployee";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AssignedTasks from "./pages/employee/AssignedTasks";
import UpdateEmployeeTask from "./pages/employee/UpdateEmployeeTask";
import EmployeeProfilePage from "./pages/employee/EmployeeProfilePage";
import Attendance from "./pages/employee/Attendance";
import Leave from "./pages/employee/Leave";
import Announcements from "./pages/employee/Announcements";
import AdminProfile from "./pages/admin/AdminProfile";
import Meeting from "./pages/future scope/meetings";
import Chat from "./pages/future scope/chat";
import FunZone from "./pages/future scope/FunZone";
import LeaveRequest from "./pages/future scope/LeaveRequest";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <>
        {/* ✅ Toast Container for notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            {/*All Admin Routes */}

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/assign-task" element={<AssignTask />} />
            <Route path="/get-specific-task" element={<GetSpecificTask />} />
            <Route path="/update-task" element={<UpdateTaskStatus />} />
            <Route path="/view-task" element={<ViewAllTasks />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/update-employee" element={<UpdateEmployee />} />
            <Route path="/delete-employee" element={<DeleteEmployee />} />
            <Route path="/getsingle-employee" element={<GetSingleEmployee />} />
            <Route path="/getall-employee" element={<GetAllEmployee />} />
            <Route path="/employee" element={<EmployeeDashboard />} />
            <Route path="/assigned-tasks" element={<AssignedTasks />} />
            <Route path="/admin-profile" element={<AdminProfile />} />

            {/*All Employee Routes */}

            <Route
              path="/update-Employee-tasks"
              element={<UpdateEmployeeTask />}
            />
            <Route
              path="/Employee-profile-page"
              element={<EmployeeProfilePage />}
            />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/announcements" element={<Announcements />} />

            {/*Features Rout */}
            <Route path="/conduct-meeting" element={<Meeting />} />
            <Route path="/team-chat" element={<Chat />} />
            <Route path="/fun-zone" element={<FunZone />} />
            <Route path="/leave-request" element={<LeaveRequest />} />
          </Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
