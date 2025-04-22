import { ShieldCheck } from "lucide-react";

const AdminProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white/70 backdrop-blur-md border border-indigo-100 rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center">
        <div className="flex flex-col items-center space-y-4">
          <ShieldCheck className="text-indigo-600 w-12 h-12" />
          <h1 className="text-3xl font-bold text-indigo-700">Admin Profile</h1>
          <p className="text-gray-700 text-lg mt-4">
            👋 You are the{" "}
            <span className="font-semibold text-indigo-600">Admin</span> now.
          </p>
          <p className="text-gray-600 text-base">
            Viewing full profile details is currently{" "}
            <span className="font-semibold">restricted</span> due to safety
            concerns.
          </p>
          <p className="text-sm text-gray-500 mt-6">
            If you believe this is an error or need access, please contact
            system support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
