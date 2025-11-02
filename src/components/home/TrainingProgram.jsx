
// pages/workout-class.js
import Image from 'next/image'; // Import Next.js Image component

const TrainingProgram = () => {
  return (
    <div className="py-16 mb-16 bg-[#FFF5F7]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
       
        <div className="flex justify-center">
          <div className="relative w-[570px] md:h-[730px] h-[600px] overflow-hidden">
            <Image
              src="/images/workout.png" // Replace with your image path
              alt="Workout Class"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-[40px] font-semibold text-gray-800 mb-4">Training program</h1>
          <p className="text-gray-600 mb-6 text-[20px]">
            Join our dynamic workout classes designed for all fitness levels. Whether you're looking to build strength, improve flexibility, or boost your endurance, our expert trainers provide engaging and personalized sessions. Get ready to challenge yourself and achieve your fitness goals in a supportive and motivating environment!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainingProgram;
