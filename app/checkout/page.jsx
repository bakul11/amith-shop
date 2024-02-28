"use client"
import useActiveUser from '@/hooks/useActiveUser';
import React from 'react';

const page = () => {
    const [user] = useActiveUser();

    return (
        <div className='checkout-section my-12'>
            <div className="px-5 lg:px-12">
                <h3 className='text-xl'> Hello, <span className='text-orange-400 font-semibold capitalize'>{user?.userName}</span> Welcome to checkout page</h3>
            </div>
        </div>
    );
};

export default page;