import { PartyPopper } from "lucide-react";

const FunZone = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white/70 backdrop-blur-md border border-pink-100 rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center">
        <div className="flex flex-col items-center space-y-4">
          <PartyPopper className="text-pink-600 w-12 h-12" />
          <h1 className="text-3xl font-bold text-pink-700">
            Welcome to Fun Zone!
          </h1>
          <p className="text-gray-700 text-lg mt-4">
            🎉 Our team is currently{" "}
            <span className="font-semibold text-pink-600">working</span> on this
            feature.
          </p>
          <p className="text-gray-600 text-base">
            We're crafting something exciting just for you. Thank you for your
            patience!
          </p>
          <p className="text-sm text-gray-500 mt-6">
            Stay tuned — fun is on the way! 😄
          </p>
        </div>
      </div>
    </div>
  );
};

export default FunZone;
