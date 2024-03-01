"use client"
import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className='px-5 lg:px-12 my-28 text-center'>
            <h2 className='text-8xl font-extrabold'>4<span className='text-red-500'>0</span>4</h2>
            <h3 className='font-bold text-xl text-slate-800 my-2'>Oops! That page can’t be found.</h3>
            <p className='my-2 text-[17px]'>Sorry, we could't find this page. please to go</p>
            <Link href='/' className='bg-blue-400 font-semibold  inline-block text-white hover:bg-orange-500 transition-all ease-in-out duration-[0.5s] rounded-md py-2 px-3 outline-none'>
                <div className="flex items-center gap-1">
                    <span>Go To Home Page</span>
                    <FaArrowRight />
                </div>
            </Link>
        </div>
    );
};

export default NotFound;