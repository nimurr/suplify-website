import Link from 'next/link';
import React from 'react';

const Page = () => {
    return (
        <div className='h-[60vh] flex items-center justify-center'>
            <div className='max-w-[500px] font-sans w-full mx-auto'>
                <h2 className='text-4xl font-semibold leading-[1.5]'>Need Help? Chat with Suplify Support</h2>
                <p className='my-5'>Our team is here to assist you in real time.</p>
                <Link href={'/chat'} className='w-full block text-center rounded-lg py-3 font-semibold bg-[#b40000] text-white'>Open chat </Link>
            </div>
        </div>
    );
}

export default Page;
