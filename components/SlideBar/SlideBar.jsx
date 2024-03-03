"use client"
import React, { useState } from 'react';
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { MdDashboard, MdLogout } from 'react-icons/md'
import Link from 'next/link';
import SlideMenu from './SlideMenu';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';



const SlideBar = () => {
    const [openSlidebar, setOpenOpenSlidebar] = useState(false);
    const router = useRouter();

    //handle logout function 
    const handleLogout = () => {
        Cookies.remove('user');
        router.push('/');
        toast.success('Logout successfully done')
    }

    //handle open Slidebar 
    const handleOpenSlidebar = () => setOpenOpenSlidebar(!openSlidebar);

    return (
        <div className={`min-h-screen  px-4 pt-8 bg-slate-800   relative ${openSlidebar ? 'w-[80px]' : 'w-[210px]'}`}>
            <Link href='/dashboard' className='text-gray-300 pt-5 capitalize flex items-center gap-x-2  ml-2 px-2'>
                <MdDashboard />
                <span className={`text-[15px] ${openSlidebar ? 'hidden' : 'block'}`}> dashboard</span>
            </Link>
            {/* angle  */}
            <FaAngleDoubleLeft className={`bg-yellow-500 rounded-full text-white text-xl w-7 h-7 p-1 cursor-pointer absolute -right-2 top-12 ${openSlidebar ? 'rotate-180' : ''}`} onClick={handleOpenSlidebar} />


            {/* slidebar menu  */}
            <SlideMenu openSlidebar={openSlidebar} />



            <button className='ml-2 px-2 '>
                <div className="flex items-center gap-2 text-gray-300" onClick={handleLogout}>
                    <MdLogout className='font-bold' />
                    <span className={`${openSlidebar ? 'hidden' : 'block'}`}>Logout</span>
                </div>
            </button>

        </div>

    );
};

export default SlideBar;