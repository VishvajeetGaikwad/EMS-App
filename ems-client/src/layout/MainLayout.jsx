import { Outlet } from "react-router-dom"; // Outlet renders the current page's component
import Sidebar from "../components/Sidebar"; // Sidebar component
import Navbar from "../components/Navbar"; // Navbar component
import Footer from "../components/Footer"; // Footer component

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Sidebar */}
      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col w-full">
          {/* Navbar */}
          <Navbar />
          {/* Page Content */}
          <main className="flex-1 p-6 overflow-auto">
            <Outlet /> {/* This renders the current page's component */}
          </main>
          {/* Footer */}
          <Footer /> {/* Footer is added here */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
