import React from 'react';
import { Crown } from 'lucide-react';

const PricingPlans = () => {

  const plans = [
    {
      feature: "Custom Nutrition plan",
      standard: "Monthly",
      premium: "Monthly",
      vip: "Monthly + Adjustments"
    },
    {
      feature: "Workout Program",
      standard: "12-Week Program",
      premium: "12-Week Program",
      vip: "Custom-Designed Monthly Plan"
    },
    {
      feature: "InBody Scan Tracking",
      standard: "Monthly",
      premium: "Bi-Weekly",
      vip: "Bi-Weekly"
    },
    {
      feature: "Shopping List & Supplement Protocol",
      standard: "Yes (No Discounts)",
      premium: "Yes + 10% Off Supplements",
      vip: "Yes + 20% Off Supplements"
    },
    {
      feature: "Specialist Support (Check-Ins)",
      standard: "2x Per Month",
      premium: "1x Per Week",
      vip: "Unlimited Check-Ins"
    },
    {
      feature: "Live Online Workouts",
      standard: "No",
      premium: "Special Discount & Limited Access",
      vip: "Unlimited Access"
    },
    {
      feature: "Exclusive Webinars",
      standard: "No",
      premium: "Monthly",
      vip: "Bi-Weekly"
    },
    {
      feature: "Personalized Blood Work & Lab Testing",
      standard: "No",
      premium: "1 Lab Test / 6 Months",
      vip: "1 Lab Test / 3 Months"
    },
    {
      feature: "Specialist Access & Scheduling",
      standard: "No",
      premium: "Standard Priority",
      vip: "Priority Scheduling"
    },
    {
      feature: "Doctor Consultation",
      standard: "No",
      premium: "No",
      vip: "1 Per Month"
    },
    {
      feature: "VIP Perks (Early Access, Discounts, Corporate Perks)",
      standard: "No",
      premium: "Yes",
      vip: "Yes + VIP Exclusive Offers"
    }
  ]

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Plans & Perks</h1>
        <p className="text-gray-600">
          Choose the plan that fits your needs and unlock exclusive benefits.
        </p>
      </div>

      <div className="bg-rose-50 rounded-lg shadow-md p-12 overflow-hidden">
        {/* Plan Headers */}
        <div className="grid md:grid-cols-4 grid-cols-2 bg-rose-100">
          <div className="p-4 border-b border-rose-200">
            <h3 className="font-semibold text-gray-800">Perks</h3>
            <p className="text-xs text-gray-600">Special benefits to enhance your wellness journey.</p>
            <div className="mt-2 text-blue-600 font-bold text-xl">$00 <span className="text-xs text-gray-500 font-normal">/month</span></div>
            <button className="mt-2 w-full py-2 px-3  border border-rose-300 text-rose-600 rounded hover:bg-rose-100 text-sm">7 Day Free Trial</button>
          </div>
          <div className="p-4 border-b border-rose-200">
            <h3 className="font-semibold text-gray-800">Standard</h3>
            <p className="text-xs text-gray-600">Get your personalized nutrition and workout plan.</p>
            <div className="mt-2 text-blue-600 font-bold text-xl">$199 <span className="text-xs text-gray-500 font-normal">/month</span></div>
            <button className="mt-2 w-full py-2 px-3 border border-rose-300 text-rose-600 rounded hover:bg-rose-100 text-sm">Subscribe now</button>
          </div>
          <div className="p-4 border-b border-rose-200">
            <h3 className="font-semibold text-gray-800">Premium</h3>
            <p className="text-xs text-gray-600">Enjoy bi-weekly check-ins and exclusive webinars.</p>
            <div className="mt-2 text-blue-600 font-bold text-xl">$399 <span className="text-xs text-gray-500 font-normal">/month</span></div>
            <button className="mt-2 w-full py-2 px-3 bg-rose-300 text-rose-700 rounded hover:bg-rose-400 text-sm">Subscribe now</button>
          </div>
          <div className="p-4 border-b border-rose-200">
            <div className="flex items-center">
              <Crown className="text-yellow-500 mr-1" size={18} />
              <h3 className="font-semibold text-gray-800">VIP</h3>
            </div>
            <p className="text-xs text-gray-600">Unlimited access to all services and exclusive perks.</p>
            <div className="mt-2 text-blue-600 font-bold text-xl">$600 <span className="text-xs text-gray-500 font-normal">/month</span></div>
            <button className="mt-2 w-full py-2 px-3 bg-red-600 text-white rounded hover:bg-red-700 text-sm">Subscribe now</button>
          </div>
        </div>

        {/* Features Rows */}
        { plans.map((row, index) => (
          <div key={index} className="grid md:grid-cols-4 grid-cols-2 border-b border-rose-100">
            <div className="p-3 bg-rose-50 border-r border-rose-100 text-sm font-medium">{row.feature}</div>
            <div className="p-3 text-center text-sm">{row.standard}</div>
            <div className="p-3 text-center text-sm">{row.premium}</div>
            <div className="p-3 text-center text-sm">{row.vip}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;