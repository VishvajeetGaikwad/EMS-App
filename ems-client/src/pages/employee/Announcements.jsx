import React from "react";

const Announcements = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          📢 Announcements
        </h2>
        <p className="text-lg text-gray-600 mb-2">Coming Soon!</p>
        <p className="text-gray-500">
          Our team is currently working on this feature. <br />
          Thank you for your patience and support. 🙌
        </p>
      </div>
    </div>
  );
};

export default Announcements;
