import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage on logout
    localStorage.removeItem("token");

    // Show toast notification
    toast.success("You have successfully logged out!");

    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-white/40 p-8 rounded-lg shadow-lg backdrop-blur-xl w-1/3">
        <h2 className="text-4xl font-extrabold text-indigo-600 mb-6 text-center">
          Logging Out...
        </h2>
        <p className="text-lg text-gray-700">
          You will be redirected to the login page shortly.
        </p>
      </div>
    </div>
  );
};

export default Logout;
