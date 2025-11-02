import React from 'react';
import { User, Heart, Rocket } from 'lucide-react';

const HowItWorksPage = () => {
  return (
    <div className=" md:w-[70%] md:mt-12 mb-10 mx-auto p-6 bg-rose-50 rounded-lg shadow-md border">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">How SupplifyLife Works</h1>
        <p className="text-gray-600">
          Create your account, choose a plan, and gain access to your personalized wellness experience.
        </p>
      </div>

      <div className="flex items-center justify-center">
      <div className="space-y-4 md:w-[50%] mx-auto">
        {/* Step 1 */}
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="text-white" size={24} />
            </div>
            <div className="h-16 w-0.5 bg-red-300 mx-auto mt-2"></div>
          </div>
          <div className="pt-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Create Account</h3>
            <p className="text-gray-600">Create your account to begin your personalized wellness journey.</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="text-white" size={24} />
            </div>
            <div className="h-16 w-0.5 bg-red-300 mx-auto mt-2"></div>
          </div>
          <div className="pt-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Start a plan</h3>
            <p className="text-gray-600">Select a plan—Standard, Premium, or VIP—tailored to your health goals.</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <Rocket className="text-white" size={24} />
            </div>
          </div>
          <div className="pt-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Get Access</h3>
            <p className="text-gray-600">Unlock your customized fitness, nutrition, and wellness plan.</p>
          </div>
        </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium shadow-md hover:bg-red-700 transition duration-200">
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default HowItWorksPage;