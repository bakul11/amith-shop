"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { MdShoppingCartCheckout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import logo from '../../public/assets/cb.webp'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';



const TopBar = () => {
    const { cart } = useSelector(state => state.cart);


    // Handle search Product Items
    const [product, setProduct] = useState([]);
    const [loadding, setLoadding] = useState(false);
    
    const [search, setSearch] = useState('');

    const handleSearchItem = async () => {
        setLoadding(true)
        await fetch(`/api/product/search-product?search=${search}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProduct(data);
                setLoadding(false);
                setSearch('')
            }).catch(err => {
                setLoadding(false);
                toast.error(err)
                setSearch('')
            })
    }





    return (
        <div className='top-section bg-white hidden lg:block'>
            <div className="px-4 lg:px-12">
                <div className="flex items-center justify-between ">
                    <div className="login-box mb-5 w-[20%]">
                        <Link href='/' className='font-bold text-slate-800 capitalize flex items-center gap-2'>
                            <Image src={logo} alt='logo' height={500} width={500} className='object-cover rounded-full h-[100px] w-[200px]' />
                        </Link>
                    </div>
                    <div className="searchbar w-[50%]">
                        <div className="subcribe relative capitalize my-8 w-full ">
                            <form onSubmit={handleSearchItem}>
                                <input type="text" placeholder='Search product here...' className='outline-none pl-8 py-3 focus:ring-orange-500 focus:ring-1 rounded-[50px] ring-1 w-full block ring-blue-400 placeholder-gray-400 text-[14px]' value={search} onChange={(e) => setSearch(e.target.value)} required />

                                {
                                    loadding ?
                                        <p className='bg-gradient-to-r from-pink-400 to-rose-500 rounded-r-[50px] text-white px-5 py-2 cursor-pointer absolute right-0 top-0 bottom-0' disabled>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span>Searching..</span>
                                                <BeatLoader
                                                    color="#FFFFFF"
                                                    speedMultiplier={2}
                                                />
                                            </div>
                                        </p>
                                        :
                                        <button className="p-3 outline-none bg-rose-400 absolute rounded-r-[50px] right-0 top-0  bottom-0">
                                            <IoIosSearch className='text-2xl text-white  cursor-pointer' />
                                        </button>

                                }


                                {/* Show Search Product UI  */}

                                <div className="shadow-lg bg-white rounded-md absolute top-12 left-0 right-0 overflow-y-auto max-h-[200px]">
                                    <div className="divide px-3 divide-y divide-dashed divide-blue-400">
                                        <div className="flex items-center gap-2 ">
                                            <div className="pd-logo">
                                                <Image src={logo} alt='logo' height={500} width={500} className='object-cover rounded-sm h-[100px] w-[100px]' />
                                            </div>
                                            <div className="pd-title">
                                                <h3 className='text-slate-600 text-[17px]'>Asus vivobook 15 inchi FHD display laptop</h3>
                                                <p className='text-gray-500'>Price : $130.00</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 ">
                                            <div className="pd-logo">
                                                <Image src={logo} alt='logo' height={500} width={500} className='object-cover rounded-sm h-[100px] w-[100px]' />
                                            </div>
                                            <div className="pd-title">
                                                <h3 className='text-slate-600 text-[17px]'>Asus vivobook 15 inchi FHD display laptop</h3>
                                                <p className='text-gray-500'>Price : $130.00</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 ">
                                            <div className="pd-logo">
                                                <Image src={logo} alt='logo' height={500} width={500} className='object-cover rounded-sm h-[100px] w-[100px]' />
                                            </div>
                                            <div className="pd-title">
                                                <h3 className='text-slate-600 text-[17px]'>Asus vivobook 15 inchi FHD display laptop</h3>
                                                <p className='text-gray-500'>Price : $130.00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                        <FaUserCircle className='text-md' />
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