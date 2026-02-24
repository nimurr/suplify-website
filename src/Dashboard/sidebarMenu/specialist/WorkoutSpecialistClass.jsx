// 'use client'
// import React from 'react';
// import { Button, Card, Typography, Space } from 'antd';
// import { PlusCircleOutlined } from '@ant-design/icons';
// import { LuMonitorPlay } from 'react-icons/lu';
// import { IoDocumentTextOutline } from 'react-icons/io5';
// import { useGetAllWorkoutClassQuery } from '@/redux/fetures/Specialist/workoutClass';
// import url from '@/redux/api/baseUrl';
// import moment from 'moment/moment';
// import Link from 'next/link';
// import { FaRegEdit } from 'react-icons/fa';

// const { p, Text, Paragraph } = Typography;

// const WorkoutSpecialistClass = () => {

//   const { data } = useGetAllWorkoutClassQuery();
//   const fullData = data?.data?.attributes;
//   console.log(fullData);



//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="flex lg:flex-row flex-col items-start gap-6">
//         {/* Left Panel: Trainer Info */}
//         <div className="w-64 bg-white rounded-md shadow p-4">
//           <img
//             // src="trainer_image_url_here" // Update with actual trainer image URL
//             src={url + fullData?.specialistInfo?.profileImage?.imageUrl}
//             alt="Trainer"
//             className="w-full h-auto object-cover rounded-md mb-4"
//           />
//           <div className="text-center mb-4">
//             <p className="text-lg font-semibold capitalize">{fullData?.specialistInfo?.name}</p>
//             {/* <p type="secondary" className="text-xs">New Yorke, America</p> */}
//           </div>
//           {
//             fullData?.specialistInfo?.profileId?.protocolNames?.length > 0 && (
//               <div className="flex flex-wrap justify-center gap-2 mb-2">

//                 {
//                   fullData?.specialistInfo?.profileId?.protocolNames?.map((role, index) => (
//                     <span
//                       key={index}
//                       className="text-xs border border-gray-300 px-2 py-1 rounded-md"
//                     >
//                       {role}
//                     </span>
//                   ))
//                 }
//               </div>
//             )
//           }
//           <p className="text-xs text-gray-600 ">
//             {fullData?.specialistInfo?.profileId?.description || "No description provided."}
//           </p>
//         </div>

//         {/* Right Panel: Available Workouts */}
//         <div className="flex-1 bg-white rounded-md shadow p-6 w-full">
//           <div className="flex justify-between items-center mb-4">
//             <p className="text-2xl font-semibold">Available Workout Schedule</p>
//             <Link href="/specialistDs/workoutClass/create" className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
//             >
//               <PlusCircleOutlined />
//               Create New
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
//             {
//               fullData?.results?.map((item, index) => (
//                 <div key={index} className="space-y-5 border border-gray-200 rounded-md p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
//                   {/* Icon Placeholder */}
//                   <div className="mb-4 flex items-start justify-between gap-5 ">
//                     <LuMonitorPlay className="text-6xl text-gray-800" />
//                     <Link href={`/specialistDs/workoutClass/update?id=${item?._id}`}>
//                       <FaRegEdit className='text-green-500 text-4xl cursor-pointer' />
//                     </Link>
//                   </div>

//                   {/* Workout Title */}
//                   <div className="flex justify-between items-center">
//                     <p className="text-xl font-semibold">{item?.scheduleName}</p>
//                     <p className="text-lg flex items-center gap-2 font-semibold text-red-600">
//                       ${item?.price}
//                       {/* <span className="line-through text-gray-500">$200</span> */}
//                     </p>
//                   </div>

//                   {/* Session and Duration Info */}
//                   {/* <div className="flex justify-between mb-4">
//                     <p className="text-sm text-gray-600">Total Session: <strong>{item?.bookingCount}</strong></p>
//                     <p className="text-sm text-gray-600">Total Duration: <strong>4h</strong></p>
//                   </div> */}

//                   {/* Start Date and Platform */}
//                   <div className="grid grid-cols-2 gap-4 text-base text-gray-600 mb-4">
//                     <p><strong>Start Date:</strong> {moment(item?.scheduleType === 'repeat' ? item?.repeatRule?.startDate
//                       : item?.startTime).format('DD MMM YYYY')}</p>
//                     <p className='capitalize'><strong>Platform:</strong> {item?.typeOfLink || 'N/A'}</p>
//                   </div>

//                   {/* Start and End Time */}
//                   <div className="grid grid-cols-2 gap-4 text-base text-gray-600 mb-4">
//                     <p><strong>Start Time:</strong> {moment(item?.scheduleType === 'repeat' ? item?.repeatRule?.startDate
//                       : item?.startTime).format('hh:mm A')}</p>
//                     <p><strong>End Time:</strong> {moment(item?.scheduleType === 'repeat' ? item?.repeatRule?.endDate
//                       : item?.endDate).format('hh:mm A')}</p>
//                   </div>

//                   {/* Description */}
//                   <p className="text-base text-gray-500 mb-4">
//                     {item?.description?.length > 100 ? item?.description?.slice(0, 100) + '...' : item?.description}
//                   </p>

//                   {/* Booking Info */}
//                   <div className="flex justify-between items-center mb-4">
//                     <p className={` text-xl font-semibold underline capitalize ${item?.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>{item?.status}</p>
//                     <p className={`text-base font-semibold  px-2 py-1 rounded-md capitalize ${item?.sessionType !== 'private' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'}`}>{item?.sessionType}</p>
//                   </div>

//                   <span className='mt-2 block text-red-600 font-semibold'>{item?.bookingCount} Booked</span>

//                   <Link href={`${item?.meetingLink}`} className="text-base underline flex items-center cursor-pointer gap-2 text-purple-700  mb-4">
//                     <IoDocumentTextOutline className='text-xl' /> Go to Meeting Link
//                   </Link>

//                 </div>
//               ))
//             }
//             {/* Workout Session Card */}

//           </div>


//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkoutSpecialistClass;


'use client'
import React from 'react';
import { Button, Card, Typography, Space, Image, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { LuMonitorPlay } from 'react-icons/lu';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { useGetAllWorkoutClassQuery, useDeleteWorkoutClassMutation } from '@/redux/fetures/Specialist/workoutClass';
import url from '@/redux/api/baseUrl';
import moment from 'moment/moment';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';


const WorkoutSpecialistClass = () => {

  const { data, refetch } = useGetAllWorkoutClassQuery();
  const fullData = data?.data?.attributes;
  console.log(fullData);
  const [deleteHospots] = useDeleteWorkoutClassMutation();

  const deleteHospotsItem = async (id) => {
    try {
      const response = await deleteHospots(id).unwrap();
      console.log('Delete response:', response);
      if (response?.code === 200) {
        refetch();
        message.success('Hotspot deleted successfully');
      } else {
        message.error('Failed to delete hotspot');
      }

      // Optionally, you can add logic to refresh the list or show a success message
    } catch (error) {
      console.error('Error deleting hotspot:', error);
      message.error('An error occurred while deleting the hotspot');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex xl:flex-row flex-col items-start gap-6">
        {/* Left Panel: Trainer Info */}
        <div className="w-64 bg-white rounded-md shadow p-4">
          <img
            src={fullData?.specialistInfo?.profileImage?.imageUrl?.includes('amazonaws') ? fullData?.specialistInfo?.profileImage?.imageUrl : url + fullData?.specialistInfo?.profileImage?.imageUrl}
            alt="Trainer"
            className="w-full h-auto object-cover rounded-md mb-4"
          />
          <div className="text-center mb-4">
            <p className="text-lg font-semibold capitalize">{fullData?.specialistInfo?.name}</p>
          </div>
          {fullData?.specialistInfo?.profileId?.protocolNames?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              {fullData?.specialistInfo?.profileId?.protocolNames?.map((role, index) => (
                <span
                  key={index}
                  className="text-xs border border-gray-300 px-2 py-1 rounded-md"
                >
                  {role}
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-600 ">
            {fullData?.specialistInfo?.profileId?.description || "No description provided."}
          </p>
        </div>

        {/* Right Panel: Available Workouts */}
        <div className="flex-1 bg-white rounded-md shadow p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <p className="text-2xl font-semibold">Available Workout Schedule</p>
            <Link
              href="/specialistDs/workoutClass/create"
              className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
            >
              <PlusCircleOutlined />
              Create New
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {fullData?.results?.map((item, index) => (
              <div
                key={index}
                className="space-y-5 border border-gray-200 rounded-md p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4 flex items-start justify-between gap-5">
                  <LuMonitorPlay className="text-6xl text-gray-800" />
                  <div className="flex items-center gap-3">
                    <button onClick={() => deleteHospotsItem(item?._id)}><MdOutlineDeleteForever className="text-red-500 text-3xl cursor-pointer" /></button>
                    <Link href={`/specialistDs/workoutClass/update?id=${item?._id}`}>
                      <FaRegEdit className="text-green-500 text-3xl cursor-pointer" />
                    </Link>
                  </div>
                </div>

                <hr />
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold">{item?.scheduleName}</p>
                  <p className="text-lg flex items-center gap-2 font-semibold text-red-600">
                    ${item?.price}
                  </p>
                </div>
                <p className='flex items-center justify-between capitalize my-2'>
                  <strong>Schedule Type:</strong> <span className={`border px-2 py-1 text-sm rounded-full ${item.scheduleType == "oneTime" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>{item.scheduleType == "oneTime" ? "One Time" : "Repeat"}</span>
                </p>
                <hr />

                {/* Conditional Rendering */}
                {item.scheduleType === 'repeat' && item.repeatRule && (
                  <div className="text-gray-600 mb-4">
                    <p className='flex items-center justify-between my-2'>
                      <strong>Start Date:</strong> {moment(item.scheduleDate).format('DD MMM YYYY')}
                    </p>
                    <p className='flex items-center justify-between my-2'>
                      <strong>End Date :</strong> {moment(item.repeatRule.endDate).format('DD MMM YYYY')}
                    </p>
                    <p className='flex items-center justify-between my-2'>
                      <strong>Start Time:</strong> {moment(item.startTime).format('hh:mm A')}
                    </p>
                    <p className='flex items-center justify-between my-2'>
                      <strong>End Time:</strong> {moment(item.endTime).format('hh:mm A')}
                    </p>
                    <p className='flex items-center justify-between my-2'>
                      <strong>Duration (weeks):</strong> {item.repeatRule.durationWeeks}
                    </p>
                    <p className='flex items-center justify-between my-2'>
                      <strong>Weekdays:</strong>
                      <div className='flex flex-wrap items-center gap-2'>
                        {item?.repeatRule?.weekDays?.map((day) => (
                          <span key={day} className="border px-2 py-1 text-sm rounded-full text-gray-600">
                            {day}
                          </span>
                        ))}
                      </div>
                    </p>
                  </div>
                )}
                {
                  item?.scheduleType === 'oneTime' && (
                    <div>
                      <p className='flex items-center justify-between my-2'>
                        <strong>Schedule Date:</strong> {moment(item.scheduleDate).format('DD MMM YYYY')}
                      </p>
                      <p className='flex items-center justify-between my-2'>
                        <strong>Schedule Start Time:</strong> {moment(item.startTime).format('hh:mm A')}
                      </p>
                      <p className='flex items-center justify-between my-2'>
                        <strong>Schedule Start Time:</strong> {moment(item.endTime).format('hh:mm A')}
                      </p>
                    </div>
                  )
                }

                {item.hotspot && item?.classType !== 'online' && (
                  <div className="text-gray-600 mb-4">
                    <hr />
                    <p className='flex items-center justify-between my-2'>
                      <strong>Hotspot Name:</strong> {item.hotspot.name}
                    </p>
                    <p className='flex items-center justify-between my-2'>
                      <strong>Hotspot Address:</strong> {item.hotspot.address}
                    </p>
                    <br />
                    {
                      item.hotspot.attachments?.attachment && (
                        <Image className='' width={100} height={100} src={item.hotspot.attachments?.attachment?.includes('amazonaws') ? item.hotspot.attachments?.attachment : (url + item.hotspot.attachments?.attachment)} alt="" />
                      )
                    }
                    <hr />
                  </div>
                )}



                <p className="text-base text-gray-500 mb-4">
                  {item.description?.length > 100
                    ? item.description.slice(0, 100) + '...'
                    : item.description}
                </p>


                {item.classType === 'online' && (
                  <div className="text-gray-600 mb-4 ">
                    <hr />
                    <p className='flex items-center justify-between my-2'>
                      <strong>Platform:</strong> {item.typeOfLink || 'N/A'}
                    </p>
                    <Link
                      href={item.meetingLink}
                      className="text-base py-2 underline flex mt-2 items-center cursor-pointer gap-2 text-purple-700"
                    >
                      <IoDocumentTextOutline className="text-xl" /> Go to Meeting Link
                    </Link>
                    <hr />
                  </div>
                )}

                {/* <div className="my-3">
                  <strong>Latest Booking:</strong>
                  {
                    item?.latestBookingStatus !== null ? <span> {item?.latestBookingStatus} </span> : <span> {item?.status} </span>
                  }
                </div> */}

                <div className="flex justify-between items-center mb-4">
                  <p
                  >
                    <strong>Status :</strong> <span className={`text-base font-semibold capitalize ${item.status === 'available' ? 'text-green-600' : 'text-red-600'
                      }`}>{item.status}</span>
                  </p>
                  <p
                    className={`text-base font-semibold px-2 py-1 rounded-md capitalize ${item.sessionType !== 'private'
                      ? 'bg-green-200 text-green-600'
                      : 'bg-red-200 text-red-600'
                      }`}
                  >
                    {item.sessionType}
                  </p>
                </div>

                <span className="mt-2 block text-red-600 font-semibold">{item.bookingCount} Booked</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSpecialistClass;
