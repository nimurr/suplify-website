import DoctorFullView from '@/Dashboard/sidebarMenu/user/DoctorView';
import React from 'react';

const Page = async ({ params }) => {
  const { id } = await params; // Await params before destructuring

  return (
    <div>
      <DoctorFullView doctorId={id} />
    </div>
  );
};

export default Page;

