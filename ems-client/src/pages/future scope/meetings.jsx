import { CalendarClock } from "lucide-react";

const Meeting = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white/70 backdrop-blur-md border border-indigo-100 rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center">
        <div className="flex flex-col items-center space-y-4">
          <CalendarClock className="text-indigo-600 w-12 h-12" />
          <h1 className="text-3xl font-bold text-indigo-700">
            Meetings Feature
          </h1>
          <p className="text-gray-700 text-lg mt-4">
            🛠️ Our team is currently{" "}
            <span className="font-semibold text-indigo-600">working</span> on
            this feature.
          </p>
          <p className="text-gray-600 text-base">
            We appreciate your patience and can't wait to bring this to you
            soon!
          </p>
          <p className="text-sm text-gray-500 mt-6">
            For updates, stay tuned or reach out to the development team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Meeting;
