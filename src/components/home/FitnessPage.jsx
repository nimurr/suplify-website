// pages/fitness.js

import { Button } from 'antd';
import Image from 'next/image'; // Import Next.js Image component
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";

const FitnessPage = () => {

  const fitnessData = [
    {
      id: 1,
      title: "VO₂ Max testing",
      description:
        "VO₂ Max, or maximal oxygen uptake, is the measure of the maximum amount of oxygen a person can utilize during intense exercise. It is considered the gold standard for assessing cardiorespiratory fitness.",
      imageSrc: "https://www.questhealth.com/dw/image/v2/BJDC_PRD/on/demandware.static/-/Sites-QD-CIT-Library/default/dwc270abef/Quest-Images/Landing%20Pages/Fitnescity/V02_1000x1000.jpg",
      altText: "Meal Plan",

    },
    {
      id: 2,
      title: "RMR (Resting Metabolic Rate) Testing",
      description:
        "Determines calories burned at rest. Useful for personalized nutrition and weight management plans.",
      imageSrc: "https://content.app-sources.com/s/74667363990689482/uploads/Images/rmr-testing-brisbane-8264468.jpg?format=webp",
      altText: "Supplements",

    },
    {
      id: 3,
      title: "Bloodwork",
      description:
        "Analyzes key biomarkers (cholesterol, glucose, hormones, etc.) to assess overall health, detect deficiencies, and monitor medical conditions.",
      imageSrc: "https://www.scripps.org/sparkle-assets/images/blood_test_samples_1200x750-59cd6b99366c6e716576ccd68351ed39.jpg",
      altText: "Workout Program",

    },
    {
      id: 4,
      title: "Body Composition Analysis",
      description:
        "Measures fat, muscle, and bone mass. Provides insight into fitness levels and progress beyond just body weight.",
      imageSrc: "https://cdn.shopify.com/s/files/1/1990/9885/files/Screenshot_205_480x480.png?v=1606216639",
      altText: "Workout Program",

    },
    {
      id: 5,
      title: "Medical Oversight",
      description:
        "Ensures safety during testing and exercise, especially for those with health risks or chronic conditions.",
      imageSrc: "https://bhmpc.com/wp-content/uploads/2025/05/pharmaceutical-sales-representative-talking-with-female-doctor-in-medical-building-hospital-768x511.jpg",
      altText: "Workout Program",

    },
  ];

  return (
    <div className="md:w-[70%] px-6 mx-auto py-16 ">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-5">
        Elevate Your Health
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Data driven protocols , With Expert Support
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fitnessData.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={card.imageSrc}
              className="w-full min-h-60 max-h-60 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {card.title}
              </h3>
              <p className="text-gray-600 mt-2">{card.description}</p>
              <Link
                href={`/store`}
                className="mt-4 bg-red-600 hover:bg-red-700 flex items-center gap-2 p-2 text-center justify-center rounded-lg text-white"
              >
                View Details  <FaArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessPage;
