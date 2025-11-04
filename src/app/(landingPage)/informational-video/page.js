import React from 'react';
import { LuCirclePlay } from 'react-icons/lu';

const Page = () => {
    return (
        <div className='py-16 pt-28 md:pt-40 container'>
            <h2 className='text-3xl font-semibold mb-5'>Informational video</h2>

            <div className='grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2  gap-5'>
                {
                    [...Array(8)].map((_, index) =>
                        <div className='p-3 rounded-lg border border-gray-300'>
                            <div className='relative'>
                                <img className='w-full rounded-lg max-h-[300px]' src="/images/doctor.png" alt="" />
                                <LuCirclePlay className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white' />
                            </div>
                            <h3 className='text-2xl font-semibold my-3'>Video title</h3>
                            <p className='font-medium  text-gray-500'>Video description Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, nostrum. Blanditiis nihil ut dicta, necessitatibus soluta amet sint dolor voluptas quidem.</p>
                        </div>
                    )
                }
            </div>



        </div>
    );
}

export default Page;
