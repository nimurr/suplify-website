"use client"
// pages/training-programs.tsx
import { Button, Card } from 'antd';
import { EditOutlined, ClockCircleOutlined, DollarOutlined, CalendarOutlined } from '@ant-design/icons';
import Image from 'next/image';
import CustomButton from '@/components/customComponent/CustomButton';
import { useRouter } from 'next/navigation';
import { useGetAllTrainingProgramQuery } from '@/redux/fetures/Specialist/traningProgram';
import Link from 'next/link';
import { PiVideo } from "react-icons/pi";


export default function TrainingPrograms() {

  const pageNumber = 1; // Example page number

  const { data, isLoading } = useGetAllTrainingProgramQuery(pageNumber);
  const programs = data?.data?.attributes?.results || [];
  console.log(programs);

  const router = useRouter()

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-700 font-semibold text-base">Training Program : {programs?.length}</h3>
        <Link className="bg-red-600 hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition" href="/specialistDs/program/create-training-program" type="primary" danger>
          Create New
        </Link>
      </div>
      {
        isLoading && (
          <p className='text-center text-xl text-blue-500'>Loading...</p>
        )
      }

      {/* Cards grid */}
      <div className="grid xl:grid-cols-5 border border-gray-200 p-5 rounded-md md:grid-cols-3 sm:grid-cols-2 gap-4">
        {programs?.map((program, idx) => (
          <Card
            key={idx}
            hoverable
            cover={
              <Image
                src={program?.attachments[0]?.attachment}
                alt={program.programName}
                width={280}
                height={180}
                className="rounded-t-md w-full rounded-lg p-2 object-cover"
              />
            }
            className="rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            bodyStyle={{ padding: '12px' }}
          >
            <h4 className="font-semibold text-[20px] capitalize text-gray-800 mb-2">{program.programName}</h4>

            <div className="flex items-center justify-between text-gray-600 text-sm gap-3 mb-1">
              <div className='flex items-center gap-2'>
                <PiVideo />
                <span>{program.totalSessionCount} Sessions</span>
              </div>
              <span>${program.price}</span>
            </div>


            <div className="flex items-center text-gray-600 text-sm gap-3 mb-3">
              <ClockCircleOutlined />
              <span>{program.durationInMonths} Months</span>
            </div>
            <div className='flex items-center justify-between gap-4'>
              <CustomButton
                text='Edit'
                onClick={() => router.push(`/specialistDs/program/edit-traning-program/${program._TrainingProgramId}?specialistId=${program.createdBy}`)}
              />

              <CustomButton
                text='View'
                onClick={() => router.push(`/specialistDs/program/view?programId=${program._TrainingProgramId}&specialistId=${program.createdBy}`)}

              />

            </div>

          </Card>
        ))}
      </div>
    </div>
  );
}
