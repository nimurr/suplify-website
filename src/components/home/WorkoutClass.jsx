
// pages/workout-class.js
import Image from 'next/image'; // Import Next.js Image component

const WorkoutClassPage = () => {
  return (
    <div className=" bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex py-20 flex-col justify-center">
          <h1 className="text-[40px] font-semibold text-gray-800 mb-4">Workout Class</h1>
          <p className="text-gray-600 mb-6 text-[20px]">
            Join our dynamic workout classes designed for all fitness levels. Whether you're looking to build strength, improve flexibility, or boost your endurance, our expert trainers provide engaging and personalized sessions. Get ready to challenge yourself and achieve your fitness goals in a supportive and motivating environment!
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <div className="relative">
            <Image
              src="/images/bg-remove-for-landingPage.png" 
              alt="Workout Class"
              width={700}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutClassPage;
