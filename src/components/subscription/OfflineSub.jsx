import React from 'react';

const OfflineSub = () => {
    const fullData = [{
        subscriptionType: 'standard',
        perksForStandard: [
            'Custom Nutrition Plan - Monthly',
            'Workout Program - 12-Week Program',
            'InBody Scan Tracking - Monthly',
            'Shopping List & Supplement Protocol - Yes (No Discounts)',
            'Specialist Support (Check-Ins) - 2x Per Month',
            'Live Online Workouts - No',
            'Exclusive Webinars - No',
            'Personalized Blood Work & Lab Testing - No',
            'Specialist Access & Scheduling - No',
            'Doctor Consultation - No',
            'VIP Perks - No',
        ],
        perksForStandardPlus: [
            'Monthly nutrition strategy',
            'Goal-based supplement protocol',
            'Monthly updated training plan',
            'Personalized user profile with habit and progress tracking',
            'Access to Suplify’s a la carte library (extra cost) for workouts, tools, doctor consultation, lab tests',
            'Suplify Rewards access (points + perks)',
            'Access to challenges, webinars, and Hot Spot discounts',
            'No coaching included',
            'Optional Upgrade: Add a Suplify Specialist for +$280/month (Total: $350/month) → Includes weekly check-ins/coaching, accountability, 15% off supplements, and protocol adjustments',
        ],
        perksForVIP: [
            'VIP Nutrition Plan - Monthly with Priority Support',
            'Workout Program - Personalized based on goals',
            'Exclusive Access to Live Online Workouts',
            'Monthly Health Check-ins with a Specialist',
            'Specialist Support (Check-Ins) - 4x Per Month',
            'VIP Access to Exclusive Webinars and Events',
            'Custom Supplement Protocol & Discounted Shopping List',
            'Priority Scheduling for Specialist Consultation',
            'Personalized Blood Work & Lab Testing',
            'Doctor Consultation Included',
            'Exclusive VIP Perks and Rewards',
        ]
    }];

    return (
        <div className="w-full mt-10">
            {fullData.map((plan, idx) => (

                <div className=" grid text-left  grid-cols-1 sm:grid-cols-2 items-start md:grid-cols-3 gap-6">

                    {plan.subscriptionType === 'standard' && (
                        <div className=" p-6 bg-gray-100 shadow-sm rounded-lg">
                            <p clsassName="text-2xl font-bold text-center block w-full">Standard Plan</p>
                            <hr clsassName="my-3 block" />
                            <br />
                            <div clsassName="spyce-y-3">
                                {plan.perksForStandard.map((perk, index) => (
                                    <li key={index} className="mb-2  text-sm list-none">{perk}</li>
                                ))}
                            </div>
                        </div>
                    )}

                    {plan.subscriptionType !== 'standardPlus' && (
                        <div className=" p-6 bg-gray-100 shadow-sm rounded-lg">
                            <p clsassName="mb-2 text-2xl font-bold text-center block w-full">Standard Plus Plan </p>
                            <hr clsassName="my-3 block" />
                            <br />
                            <div clsassName="spyce-y-3">
                                {plan.perksForStandardPlus.map((perk, index) => (
                                    <li key={index} className="mb-2  text-sm list-none">{perk}</li>
                                ))}
                            </div>
                        </div>
                    )}

                    {plan.subscriptionType !== 'VIP' && (
                        <div className=" p-6 bg-gray-100 shadow-sm rounded-lg">
                            <p clsassName="mb-2 text-2xl font-bold text-center block w-full">VIP Plan</p>
                            <hr clsassName="my-3 block" />
                            <br />
                            <div clsassName="spyce-y-3">
                                {plan.perksForVIP.map((perk, index) => (
                                    <li key={index} className="mb-2  text-sm list-none">{perk}</li>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            ))
            }
        </div >
    );
};

export default OfflineSub;
