import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Typed from "typed.js";
import { ArrowRightCircle } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const typedRef = useRef(null);
  const typedEl = useRef(null);

  useEffect(() => {
    import("../assets/Landing.json").then((mod) => {
      setAnimationData(mod.default);
    });
  }, []);

  useEffect(() => {
    if (!showIntro && typedEl.current) {
      typedRef.current = new Typed(typedEl.current, {
        strings: [
          "Empower Your Team 🚀",
          "Boost Your Productivity ⚡",
          "Experience the Future of Work 🔮",
        ],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
      });
    }
    return () => typedRef.current?.destroy();
  }, [showIntro]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden font-sans">
      {/* Splash Intro Animation */}
      {showIntro && animationData && (
        <div className="absolute inset-0 z-50 bg-white flex items-center justify-center animate-zoomFade">
          <Lottie animationData={animationData} loop={false} />
        </div>
      )}

      {/* Main Landing Content */}
      {!showIntro && (
        <>
          {/* Animated Backgrounds */}
          <div className="absolute w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-gradient-to-r from-blue-200 to-blue-400 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute top-1/3 left-[45%] w-16 h-16 bg-blue-400/20 backdrop-blur-sm rounded-full animate-bounce"></div>
            <div className="absolute top-[70%] left-1/4 w-24 h-24 bg-indigo-300/30 rounded-full animate-spin-slow"></div>
          </div>

          {/* Glass Card */}
          <div className="relative z-10 backdrop-blur-xl bg-white/60 shadow-2xl rounded-3xl p-12 px-16 text-center border border-white/20 animate-fade-in-slow">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
              Welcome to <span className="text-blue-400">EMS Portal</span>
            </h1>

            <span
              ref={typedEl}
              className="block text-2xl md:text-3xl font-semibold text-blue-600 h-16 mb-6"
            />

            <p className="text-md md:text-lg text-blue-800 mb-8">
              Manage your team, tasks, and productivity all in one place.
            </p>

            <button
              onClick={handleStart}
              className="flex items-center gap-3 mx-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Get Started <ArrowRightCircle className="text-white" />
            </button>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-100 via-transparent to-transparent" />
        </>
      )}

      {/* Keyframe Styles */}
      <style>
        {`
          @keyframes zoomFade {
            0% { transform: scale(1); opacity: 1; }
            70% { transform: scale(3); opacity: 0.5; }
            100% { transform: scale(5); opacity: 0; }
          }
          .animate-zoomFade {
            animation: zoomFade 2.5s ease-in-out forwards;
          }

          @keyframes fade-in-slow {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-slow {
            animation: fade-in-slow 1.8s ease-out forwards;
          }

          .animate-spin-slow {
            animation: spin 10s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
