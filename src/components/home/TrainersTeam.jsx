// // pages/doctor-team.js
// import Image from 'next/image'; // Import Next.js Image component

// const TrainersTeam = () => {
//   return (
//     <div className="bg-pink-50 py-16">
//       <div className="md:w-[70%] px-6 mx-auto">

//         <div className="grid grid-cols-1 md:grid-cols-2   items-center">


//           <div>
//             <Image
//               src="/images/trainer.png" // Replace with your image path
//               alt="Doctor"
//               width={600}
//               height={500}
//               className="  shadow-xl md:h-[600px]"
//             />
//           </div>

//           <div>
//             <h1 className="text-4xl font-bold text-gray-800 mb-8 ">
//               Meet Our Expert Trainers
//             </h1>
//             <p className="text-gray-600 mb-6">
//               At <span className="font-semibold text-gray-800">SuplifyLife</span>, we bring you a team of certified, experienced doctors who are committed to helping you achieve your health and fitness goals. Here's how our doctors can guide you through your wellness journey:
//             </p>

//             <ul className="list-disc pl-5 space-y-2 text-gray-600">
//               <li><span className="font-semibold">Personalized Plans:</span> Custom nutrition and workout plans.</li>
//               <li><span className="font-semibold">Supplement Guidance:</span> Expert recommendations for your health needs.</li>
//               <li><span className="font-semibold">Regular Check-Ins:</span> Ongoing support to track your progress.</li>
//               <li><span className="font-semibold">Specialized Protocols:</span> Tailored plans for fat loss, muscle gain, and more.</li>
//               <li><span className="font-semibold">Health Monitoring:</span> InBody scans and blood work for comprehensive tracking.</li>
//               <li><span className="font-semibold">Convenient Consultations:</span> Book online consultations from anywhere.</li>
//             </ul>

//             <p className="mt-6 text-lg text-gray-800">
//               <span className="font-semibold">Book a consultation today</span> and start your journey to better health with expert guidance tailored to your needs.
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrainersTeam;


// pages/specialist-team.js
import Image from 'next/image';

const SpecialistsTeam = () => {
  return (
    <div className="bg-pink-50 py-16">
      <div className="md:w-[70%] px-6 mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 items-center">

          <div>
            <Image
              src="/images/trainer.png"
              alt="Specialist"
              width={600}
              height={500}
              className="shadow-xl md:h-[600px]"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              Meet Our Expert Specialists
            </h1>
            <p className="text-gray-600 mb-6">
              At <span className="font-semibold text-gray-800">Suplify</span>, our certified specialists are experienced health and performance professionals dedicated to guiding clients toward better health, stronger bodies, and long-term results. Each specialist is trained in the Suplify system and works closely with clients to provide personalized coaching, accountability, and expert guidance throughout their journey.
            </p>

            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><span className="font-semibold">Nutrition Expertise:</span> Personalized nutrition strategies tailored to your goals.</li>
              <li><span className="font-semibold">Training Guidance:</span> Expert coaching to help you build a stronger body.</li>
              <li><span className="font-semibold">Supplementation Support:</span> Science-backed supplement recommendations for your needs.</li>
              <li><span className="font-semibold">Lifestyle Coaching:</span> Building sustainable habits for long-term results.</li>
              <li><span className="font-semibold">Progress Tracking:</span> Detailed monitoring to keep you on the right path.</li>
              <li><span className="font-semibold">Consistent Communication:</span> Ongoing accountability and individualized support.</li>
            </ul>

            <p className="mt-6 text-lg text-gray-800">
              <span className="font-semibold">Book a consultation today</span> and start your journey to better health with expert guidance tailored to your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistsTeam;