import React from 'react';
import { Crown } from 'lucide-react';
import Subscription from '../subscription/Subscription';
import NewSubscription from '../subscription/NewSubscription';

const PricingPlans = () => {


  return (
    <div className=' md:w-[70%] md:mt-12 mx-auto bg-rose-50 rounded-lg shadow-md border'>
      <h2 className='text-3xl font-semibold text-center py-5'>Choose a Plan</h2>
      {/* <Subscription /> */}
      <NewSubscription />
    </div>
  );
};

export default PricingPlans;