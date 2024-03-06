"use client"
import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md';

const EmptyCart = () => {
    return (
        <div className='empty-cart px-5 lg:px-12 text-center grid place-items-center'>
            <MdAddShoppingCart className='text-slate-600' size={150}/>
            <h2 className='text-slate-700 font-semibold text-2xl my-3'>Your shopping cart is empty</h2>
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