import React from "react";

const OfflineSub = () => {
  const plans = [
    {
      id: "standard-static",
      name: "STANDARD MEMBERSHIP",
      price: "$— / month",
      subtitle:
        "A low-cost membership that unlocks access to the entire Suplify ecosystem.",
      subscriptionType: "standard",
      perks: [
        "Access to the full Suplify platform",
        "Huge discounts on high-quality supplements",
        "Discounts on coaching",
        "Discounts on doctor consultations",
        "Discounts on lab testing",
        "Discounts on VO₂ Max, RMR, HRV testing",
        "Discounts on protocol upgrades",
        "Member-only pricing on wellness tools & programs",
        "Access to challenges, webinars, and member events",
      ],
      idealFor:
        "Anyone wanting high-end wellness resources at wholesale pricing — without coaching.",
    },
    {
      id: "standardPlus-static",
      name: "SUPLIFY+ (COACHING)",
      price: "$— / month",
      title: "Your Specialist. Your Strategy. Your Upgrade.",
      subtitle: "Your Specialist. Your Strategy. Your Upgrade.",
      subscriptionType: "standardPlus",
      perks: [
        "Everything in Standard Membership",
        "Weekly coaching & accountability",
        "One private training session per week",
        "Personalized health & performance strategy",
        "Nutrition guidance and protocol updates",
        "Training program adjustments",
        "Priority access to specialists",
        "Free entries to webinars & seminars",
        "Preferred access to challenges & events",
        "Product giveaways",
        "Members-only upgrades",
      ],
      idealFor:
        "Clients who want structure, support, expert guidance, and consistent accountability.",
    },
    {
      id: "vise-static-plan",
      name: "VISE (PREMIUM MEDICAL PROGRAM)",
      price: "Pricing Varies",
      title:
        "The Complete Medical + Performance Transformation Program",
      subtitle:
        "16-week personalized medical & performance protocol",
      subscriptionType: "vise",
      perks: [
        "Full lab panel",
        "VO₂ Max, RMR, and HRV testing",
        "Doctor consultation to review all findings",
        "Fully customized medical & performance protocol",
        "Assigned Specialist for full program execution",
        "Nutrition, training, supplement & lifestyle plan",
        "Ongoing adjustments and clinical oversight",
        "All costs bundled into one all-inclusive program",
      ],
      idealFor:
        "Clients who want a full medical-grade transformation with clinical oversight.",
    },
  ];

  return (
    <div className="w-full my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-6 bg-gray-100 rounded-lg shadow-sm flex flex-col"
          >
            <h2 className="text-xl font-bold text-center">{plan.name}</h2>
            <p className="text-center text-lg font-semibold mt-2">
              {plan.price}
            </p>

            {plan.subtitle && (
              <p className="text-sm text-center mt-2 text-gray-600">
                {plan.subtitle}
              </p>
            )}

            <hr className="my-4" />

            <ul className="space-y-2 flex-1">
              {plan.perks.map((perk, index) => (
                <li key={index} className="text-sm">
                  • {perk}
                </li>
              ))}
            </ul>

            <div className="mt-4 text-sm text-gray-700">
              <strong>Ideal For:</strong> {plan.idealFor}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfflineSub;
