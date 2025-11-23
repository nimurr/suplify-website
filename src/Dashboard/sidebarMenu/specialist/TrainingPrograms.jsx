"use client"
// pages/training-programs.tsx
import { Button, Card } from 'antd';
import { EditOutlined, ClockCircleOutlined, DollarOutlined, CalendarOutlined } from '@ant-design/icons';
import Image from 'next/image';
import CustomButton from '@/components/customComponent/CustomButton';
import { useRouter } from 'next/navigation';
import { useGetAllTrainingProgramQuery, useSoftDeleteTrainingProgramMutation } from '@/redux/fetures/Specialist/traningProgram';
import Link from 'next/link';
import { PiVideo } from "react-icons/pi";
import { MdOutlineDeleteForever } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';


export default function TrainingPrograms() {

  const pageNumber = 1; // Example page number

  const { data, isLoading, refetch } = useGetAllTrainingProgramQuery(pageNumber);
  const programs = data?.data?.attributes?.results || [];
  console.log(programs);

  const router = useRouter()

  const [deleteTrainingProgram] = useSoftDeleteTrainingProgramMutation();

  const handleDeleteProgramItem = async (program) => {
    console.log('Delete program:', program?._TrainingProgramId);
    // Implement delete functionality here

    try {
      const res = await deleteTrainingProgram(program?._TrainingProgramId).unwrap();
      console.log(res);
      if (res?.code == 200) {
        toast.success('Program deleted successfully');
        refetch();
      } else {
        toast.error('Failed to delete program');
      }
    } catch (error) {
      console.error('Failed to delete program:', error);
      toast.error('Failed to delete program');
    }


  }

  return (
    <div className="p-6">
      <Toaster />
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
      {
        programs?.length > 0 && (
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
                    height={280}
                    className="rounded-t-md w-full max-h-[250px] min-h-[250px] rounded-lg p-2 object-cover"
                  />
                }
                className="rounded-md shadow-sm relative border border-gray-200 hover:shadow-md transition-shadow duration-200"
                bodyStyle={{ padding: '12px' }}
              >
                <button onClick={() => handleDeleteProgramItem(program)} className='absolute top-2 right-2 h-10 w-10 bg-white rounded-full flex items-center justify-center cursor-pointer'><MdOutlineDeleteForever className='text-2xl text-red-600' /></button>
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
        )
      }
      {
        programs?.length === 0 && !isLoading && (
          <p className='text-center text-xl font-semibold text-red-500'>No Training Programs Found</p>
        )
      }
    </div>
  );
}
