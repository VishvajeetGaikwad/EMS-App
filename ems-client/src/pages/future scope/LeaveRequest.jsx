import { Clipboard } from "lucide-react";

const LeaveRequest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-100 to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white/70 backdrop-blur-md border border-teal-100 rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center">
        <div className="flex flex-col items-center space-y-4">
          <Clipboard className="text-teal-600 w-12 h-12" />
          <h1 className="text-3xl font-bold text-teal-700">Leave Request</h1>
          <p className="text-gray-700 text-lg mt-4">
            🚧 Our team is currently{" "}
            <span className="font-semibold text-teal-600">working</span> on this
            feature.
          </p>
          <p className="text-gray-600 text-base">
            We're making sure the leave request system is top-notch. Thank you
            for your patience!
          </p>
          <p className="text-sm text-gray-500 mt-6">
            Your leave request will be processed soon. Stay tuned! 😊
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;
