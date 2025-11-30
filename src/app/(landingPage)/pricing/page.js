import PricingPlans from '@/components/home/PlanPage';
import Subscription from '@/components/subscription/Subscription';
import React from 'react';

const page = () => {
    return (
        <div className='py-16 pt-28 md:pt-40 flex justify-center items-center  md:w-[70%]  mx-auto '>
            {/* <PricingPlans /> */}
            <Subscription />
        </div>
    );
};

export default page;