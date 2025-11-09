
"use client"
import CustomButton from '@/components/customComponent/customButton';
import url from '@/redux/api/baseUrl';
import { useDoctorAppoinmentBookedMutation, useGetFullDataQuery } from '@/redux/fetures/patient/patient';
import { LeftOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import { Calendar, Clock } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function AppointmentScheduler({ doctorId }) {

  const { data, isLoading, refetch } = useGetFullDataQuery(doctorId)
  const fullData = data?.data?.attributes?.result?.results;
  const profile = data?.data?.attributes?.doctorProfile;
  console.log(fullData);

  // Sample data for schedules
  const router = useRouter()

  const back = () => {
    router.push('/dashboard/doctor')
  }
  return (
    <div>
      <h1 className='text-2xl font-semibold flex items-center gap-2 my-12'>
        <LeftOutlined onClick={() => back()} className=' cursor-pointer' />
        View Full Doctor
      </h1>
      <div className="bg-gray-50 min-h-screen lg:flex gap-4 p-6">
        {/* Header Section */}
        <div className=" lg:w-[20%] mb-8">
          <div className="rounded-lg shadow-md bg-white border border-gray-200 overflow-hidden font-sans">

            <div className="relative w-full h-60">
              <img
                src={profile?.profileImage?.imageUrl.includes("amazonaws.com") ? profile?.profileImage?.imageUrl : url + profile?.profileImage?.imageUrl}
                alt="doctor"
                className="w-full" // optional styling
              />
            </div>

            <div className="p-4">
              <h3 className="text-center font-semibold text-lg mb-1">{profile?.name}</h3>
              <p className="text-center text-sm text-gray-500 mb-4">{profile?.address || "N/A"}</p>
              <hr className="border-gray-200 mb-4" />
              <h4 className="font-semibold text-sm mb-2">Description</h4>
              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                {profile?.profileId?.description}
              </p>
              {/* <div className="md:flex md:gap-3">

                <CustomButton
                  text='Book Now'
                />

                <Button
                  type="default"
                  className="flex-1 border-red-700 text-red-700 hover:bg-red-50"
                  size="large"
                >
                  Message
                </Button>
              </div> */}
            </div>
          </div>
        </div>

        <div className='lg:w-[80%]'>

          <div className="ml-auto flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">Available Schedules</div>
            <div className="font-bold text-gray-800">Total Schedules: 10</div>
          </div>
          {
            isLoading && (
              <h1 className='text-2xl font-semibold flex items-center gap-2 my-12'>
                Loading...
              </h1>
            )
          }
          {/* Schedules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6">
            {fullData?.map((schedule) => (
              <ScheduleCard
                key={schedule._id}
                refetch={refetch}
                schedule={schedule}
              />
            ))}
          </div>
        </div>

        {/* Footer Section */}

      </div>
    </div>
  );
}

function ScheduleCard({ schedule, refetch }) {
  const borderClass = schedule.isFeatured
    ? "border-2 border-dashed border-red-400"
    : "border border-gray-200";

  const specialBadge = schedule.isSpecial && (
    <div className="absolute -top-2 right-6 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
      Special
    </div>
  );

  const [doctorBooked] = useDoctorAppoinmentBookedMutation();

  const handleBooked = async () => {
    try {
      const res = await doctorBooked(schedule._id).unwrap();
      console.log(res);
      refetch();
      if (res?.code == 200) {
        toast.success(res?.message)
        refetch();
        if (res?.data?.attributes?.url) {
          window.location.href = `${res?.data?.attributes?.url}`;
        }
      }
      else {
        toast.error(res?.message)
      }
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <div
      className={`relative border border-[#eee] rounded-lg p-4 
        ${schedule?.scheduleStatus == "booked" && "bg-green-100 border-2 border-green-400"} 
        ${schedule.patientBookings && schedule.scheduleStatus == "expired" && "bg-red-100 border-2 border-red-400"} hover:shadow-md transition-shadow duration-200`}
    >
      <Toaster />

      {
        schedule.patientBookings && schedule.scheduleStatus == "booked" && (
          <div className="absolute top-1 right-1 bg-green-300 text-green-800 text-xs px-2 py-1 rounded-full">
            Booked 
          </div>
        )
      }

      <div className="mb-4 pt-5">
        <span className="inline-block text-sm font-medium"> {schedule.scheduleName}</span>
        <span className="float-right text-red-500 font-bold">${schedule.price}</span>
        <span className="float-right text-xs text-gray-500 mt-1 mr-1">USD</span>
      </div>

      <div className='my-2'>
        <span className=" text-gray-500">Inner Bookings status: {schedule?.patientBookings?.status}</span>
      </div>
      <div className='my-2 mb-4'>
        <span className=" text-gray-500">Outer Schedule Status: {schedule?.scheduleStatus}</span>
      </div>

      <div className="flex items-center text-sm text-gray-700 mb-2">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{moment(schedule.scheduleDate).format('dddd, MMMM D, YYYY')}</span>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center text-sm text-gray-700">
          <Clock className="w-4 h-4 mr-2" />
          <span>{moment(schedule.startTime).format('h:mm A')}</span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <Clock className="w-4 h-4 mr-2" />
          <span>{moment(schedule.endTime).format('h:mm A')}</span>
        </div>
      </div>
      <div className='my-2'>
        <span className="text-xs text-gray-500">Type Link: {schedule.typeOfLink}</span>
      </div>
      <div className='my-2'>
        <span onClick={() => navigator.clipboard.writeText(schedule.meetingLink)} className="text-xs cursor-pointer text-blue-500 font-semibold">Meeting Link: {schedule.meetingLink}</span>
      </div>

      <div className="text-xs text-gray-500 mb-4">
        {schedule.description}
      </div>

      {
        schedule.scheduleStatus !== "booked" && schedule.scheduleStatus !== "expired" && (
          <button onClick={handleBooked} className="w-full bg-red-500 text-white py-2 rounded-md">
            Book Now
          </button>
        )
      }
      {
        schedule.patientBookings?.status == "pending" && schedule.scheduleStatus !== "available" && (
          <button onClick={handleBooked} className="w-full bg-red-500 text-white py-2 rounded-md">
            Book Now
          </button>
        )
      }
    </div>
  );
}