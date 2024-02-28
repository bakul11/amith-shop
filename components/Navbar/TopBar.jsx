"use client"
import Link from 'next/link';
import React from 'react';
import { MdShoppingCartCheckout } from "react-icons/md";
import { FaUserLock } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import logo from '../../public/assets/cb.webp'
import Image from 'next/image';
import { useSelector } from 'react-redux';



const TopBar = () => {
    const { cart } = useSelector(state => state.cart);

    return (
        <div className='top-section bg-white'>
            <div className="px-4 lg:px-12">
                <div className="flex items-center justify-between ">
                    <div className="login-box mb-5 w-[20%]">
                        <Link href='/' className='font-bold text-slate-800 capitalize flex items-center gap-2'>
                            <Image src={logo} alt='logo' height={500} width={500} className='object-cover rounded-full h-[100px] w-[200px]' />
                        </Link>
                    </div>
                    <div className="searchbar w-[50%]">
                        <div className="subcribe relative capitalize my-8 w-full ">
                            <form action="">
                                <input type="text" placeholder='Search Here...' className='outline-none pl-8 py-3 focus:ring-orange-500 focus:ring-1 rounded-[50px] ring-1 w-full block ring-blue-400 placeholder-gray-400 text-[14px]' required />
                                <IoIosSearch className='text-2xl text-gray-400 absolute right-2 top-[10px] cursor-pointer' />
                            </form>
                        </div>
                    </div>
                    <div className="card-login w-[20%]">
                        <div className="flex items-center gap-8">
                            <div className="cart-button relative">
                                <Link href='/cart'>
                                    <MdShoppingCartCheckout className='text-2xl text-slate-950' />
                                    <p className='bg-blue-400 absolute -top-4 -right-2 rounded-full text-white w-5 h-5 text-center'>{cart?.length}</p>
                                </Link>

                            </div>
                            <div className="loginBtn">
                                <Link href='/login' className='bg-gradient-to-r from-cyan-500 to-blue-400 text-white rounded-[50px] p-2 inline-block'>
                                    <div className="flex items-center gap-2">
                                        <FaUserLock className='text-md' />
                                        Login account
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;