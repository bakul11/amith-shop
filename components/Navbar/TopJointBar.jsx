"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { IoCloseCircleOutline } from "react-icons/io5";


const TopJointBar = () => {
    const [open, setOpen] = useState(true);

    //handle hide show 
    const handleHideShow = () => setOpen(!open)


    return (
        <div className={`bg-gradient-to-l from-cyan-500 to-blue-400 py-5 text-center ${open ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center gap-8">
                <div className="flex items-center justify-center gap-5 flex-wrap">
                    <h3 className='text-white font-[600] text-[18px]'>Unlimited is here! Plus Membership just got even better</h3>
                    <Link href='/login' className='bg-orange-400 p-2 text-white rounded-lg'>Joint Now</Link>
                </div>
                <div className="close-btn">
                    <IoCloseCircleOutline className='text-gray-200 cursor-pointer text-xl' onClick={handleHideShow} />
                </div>
            </div>
        </div>
    );
};

export default TopJointBar;