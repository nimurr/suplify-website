 

import MessagesPage from '@/components/messages/Meassage';
import React, { Suspense } from 'react';

const page = () => {
    return (
        <div>
            <Suspense>
            <MessagesPage />    
            </Suspense>
        </div>
    );
};

export default page;