// pages/fitness.js

import { Button } from 'antd';
import Image from 'next/image'; // Import Next.js Image component
import { FaArrowRight } from "react-icons/fa";

const FitnessPage = () => {

    const fitnessData = [
        {
          id: 1,
          title: "Meal Plans",
          description:
            "Nutrition plans tailored to your goals, preferences, and dietary requirements.",
          imageSrc: "/images/fitness2.png",
          altText: "Meal Plan",
       
        },
        {
          id: 2,
          title: "Supplement Recommendations",
          description:
            "Expert-backed supplement suggestions to support your fitness journey.",
          imageSrc: "/images/fitness1.png",
          altText: "Supplements",
   
        },
        {
          id: 3,
          title: "Workout Programs",
          description:
            "Progressive workout routines designed for all fitness levels.",
          imageSrc: "/images/fitness3.png",
          altText: "Workout Program",
        
        },
      ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Elevate Your Fitness
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Tailored meals, supplements, and workouts for your goals.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {fitnessData.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src={card.imageSrc}
              alt={card.altText}
              width={500}
              height={400}
              className="w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {card.title}
              </h3>
              <p className="text-gray-600 mt-2">{card.description}</p>
              <Button
                type="primary"
                className="mt-4 bg-red-600 hover:bg-red-700 flex items-center gap-2 text-white"
              >
              View Details  <FaArrowRight />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessPage;
