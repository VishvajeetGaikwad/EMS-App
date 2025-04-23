import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Mail, Lock } from "lucide-react";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const animationRef = useRef(null);

  // Lazy load animation when in view
  const handleIntersection = useCallback((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setAnimationLoaded(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "200px",
    });
    if (animationRef.current) observer.observe(animationRef.current);

    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    return () => observer.disconnect();
  }, [handleIntersection]);

  // Dynamic import of Lottie animation
  useEffect(() => {
    if (animationLoaded && !animationData) {
      import("../../assets/LoginAnimation.json").then((mod) => {
        setAnimationData(mod.default);
      });
    }
  }, [animationLoaded, animationData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://ems-app-pcl7.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token } = res.data;
      localStorage.setItem("token", token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;
      localStorage.setItem("role", role);

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "employee") {
        navigate("/employee");
      } else {
        toast.error("Unknown user role");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 flex items-center justify-center relative overflow-hidden">
      {/* Animation / Gradient Background */}
      <div ref={animationRef} className="absolute inset-0 z-0">
        {animationLoaded && animationData ? (
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay
            className="w-full h-full object-cover opacity-50"
            style={{ transform: "scale(1.15)" }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 opacity-40" />
        )}
      </div>

      {/* Login Card */}
      <div
        ref={formRef}
        className="relative z-10 flex flex-col md:flex-row items-center justify-center bg-white/40 shadow-2xl rounded-2xl w-full md:w-2/3 lg:w-1/2 p-12 backdrop-blur-xl"
      >
        {/* Form Section */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <h2 className="text-4xl font-extrabold text-indigo-600 mb-6 text-center leading-tight">
            Welcome to the Future of Productivity
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-sm text-center font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8 w-full">
            <div className="relative">
              <Mail className="absolute left-4 top-3 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 pr-6 py-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition shadow-sm bg-white/70 backdrop-blur-md text-lg"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-6 py-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition shadow-sm bg-white/70 backdrop-blur-md text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:-translate-y-0.5 hover:shadow-lg text-lg"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-700 mt-8">
            Don't have an account?{" "}
            <span className="text-indigo-600 cursor-pointer hover:underline font-semibold">
              Contact Admin
            </span>
          </p>
        </div>

        {/* Text Section */}
        <div className="hidden md:flex flex-col items-start justify-center w-full md:w-1/2 p-8">
          <h1 className="text-5xl font-extrabold text-indigo-600 mb-4 leading-snug">
            Elevate Your Work Experience
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Sign in to access the best tools and features tailored for your
            workflow. We're here to support your productivity.
          </p>
          <p className="text-sm text-gray-600">
            Powered by{" "}
            <span className="font-semibold text-indigo-600">Your Company</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
