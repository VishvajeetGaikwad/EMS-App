import { useEffect, useRef, useState } from "react";
import { Home, ClipboardList, User, Bell, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { toast } from "react-toastify";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const navRefs = useRef([]);
  const logoutRef = useRef(null);

  const [userRole, setUserRole] = useState(
    localStorage.getItem("role") || "employee"
  );

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) setUserRole(role);

    // GSAP animation
    gsap.fromTo(
      sidebarRef.current,
      { x: -250, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      navRefs.current,
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.2,
      }
    );

    gsap.fromTo(
      logoutRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        delay: 0.8,
        duration: 0.4,
      }
    );
  }, []);

  const dashboardPath = userRole === "admin" ? "/admin" : "/employee";
  const tasksPath = userRole === "admin" ? "/view-task" : "/assigned-tasks";
  const profilePath =
    userRole === "admin" ? "/admin-profile" : "/Employee-profile-page";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("You have successfully logged out!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div
      ref={sidebarRef}
      className="h-full bg-white shadow-lg border-r p-6 space-y-6 overflow-y-auto sm:w-64 md:w-72 lg:w-80 xl:w-96 transition-all"
    >
      <div className="flex items-center gap-2">
        <FaUsers className="text-2xl text-indigo-600 w-10 h-12 mb-8 flex-shrink-0" />
        <h1 className="text-2xl font-bold mb-8 text-indigo-600 leading-tight m-0">
          TeamSync
        </h1>
      </div>

      {/* Dashboard */}
      <div ref={(el) => (navRefs.current[0] = el)}>
        <Link
          to={dashboardPath}
          className={`flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-200 ${
            pathname === dashboardPath
              ? "bg-indigo-200 text-indigo-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          <span className="text-xl">
            <Home />
          </span>
          Dashboard
        </Link>
      </div>

      {/* Tasks / Profile / Announcements */}
      <div className="space-y-4">
        {[
          { label: "Tasks", icon: <ClipboardList />, to: tasksPath },
          { label: "Profile", icon: <User />, to: profilePath },
          { label: "Announcements", icon: <Bell />, to: "/announcements" },
        ].map((item, index) => (
          <div key={item.label} ref={(el) => (navRefs.current[index + 1] = el)}>
            <Link
              to={item.to}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-200 ${
                pathname === item.to
                  ? "bg-indigo-200 text-indigo-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-10">
        <div
          ref={logoutRef}
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-500 hover:bg-red-100 p-3 rounded-lg transition-all duration-200 cursor-pointer"
        >
          <LogOut className="text-xl" />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
