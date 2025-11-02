// pages/doctor-team.js
import Image from 'next/image';

const DoctorTeamPage = () => {
  return (
    <div className="bg-pink-50 py-16">
      <div className="container mx-auto">
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
         
          <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-8 ">
          Meet Our Expert Doctors
        </h1>
            <p className="text-gray-600 mb-6">
              At <span className="font-semibold text-gray-800">SuplifyLife</span>, we bring you a team of certified, experienced doctors who are committed to helping you achieve your health and fitness goals. Here's how our doctors can guide you through your wellness journey:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><span className="font-semibold">Personalized Plans:</span> Custom nutrition and workout plans.</li>
              <li><span className="font-semibold">Supplement Guidance:</span> Expert recommendations for your health needs.</li>
              <li><span className="font-semibold">Regular Check-Ins:</span> Ongoing support to track your progress.</li>
              <li><span className="font-semibold">Specialized Protocols:</span> Tailored plans for fat loss, muscle gain, and more.</li>
              <li><span className="font-semibold">Health Monitoring:</span> InBody scans and blood work for comprehensive tracking.</li>
              <li><span className="font-semibold">Convenient Consultations:</span> Book online consultations from anywhere.</li>
            </ul>

            <p className="mt-6 text-lg text-gray-800">
              <span className="font-semibold">Book a consultation today</span> and start your journey to better health with expert guidance tailored to your needs.
            </p>
          </div>
          <div>
            <Image
              src="/images/doctor.png"
              alt="Doctor"
              width={600}
              height={700}
              className="shadow-xl md:h-[600px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorTeamPage;
