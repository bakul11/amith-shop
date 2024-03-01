"use client"
import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const EmptyCart = () => {
    return (
        <div className='empty-cart px-5 lg:px-12 text-center grid place-items-center'>
            <h2 className='text-slate-700 font-semibold'>Shopping cart is empty</h2>
            <p className='text-gray-400'>let's go shopping page</p>
            <Link href='/' className='bg-blue-400 font-semibold inline-block text-white hover:bg-orange-500 transition-all ease-in-out duration-[0.5s] rounded-md py-2 px-3 outline-none'>
                <div className="flex items-center gap-1">
                    <span>Start Shopping Now</span>
                    <FaArrowRight />
                </div>
            </Link>
        </div>
    );
};

export default EmptyCart;