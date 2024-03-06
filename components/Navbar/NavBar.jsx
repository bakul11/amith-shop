"use client"
import useActiveUser from '@/hooks/useActiveUser';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaAngleDown, FaShoppingBag } from 'react-icons/fa';
import { LiaUserSolid } from "react-icons/lia";
import { RxDashboard } from "react-icons/rx";
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { MdLogout } from 'react-icons/md';







const menuData = [
    {
        title: 'home',
        path: '/'
    },
    {
        title: 'graphices',
        path: '/graphices'
    },
    {
        title: 'tools',
        path: '/tools'
    },
    {
        title: 'products',
        path: '/products'
    },
    {
        title: 'fonts',
        path: '/fonts'
    },
    {
        title: 'design',
        path: '/design'
    },
    {
        title: 'services',
        path: '/services'
    },
    {
        title: 'logo',
        path: '/logo'
    },
    {
        title: 'contact us',
        path: '/contact'
    }
]



const NavBar = () => {
    const pathName = usePathname();
    const router = useRouter();
    const [user] = useActiveUser();
    const [open, setOpen] = useState(false);
    const admin = user?.role;

    //handle Open
    const handleOpen = () => setOpen(!open);


    //handle logout function 
    const handleLogout = () => {
        Cookies.remove('user');
        router.push('/');
        toast.success('Logout successfully done')
    }


    return (
        <div className='bg-white shadow-sm hidden lg:block'>
            <div className="px-4 lg:px-12 py-5">
                <div className="flex items-center justify-between gap-2">
                    {
                        menuData && menuData?.map((item, index) => {
                            const { title, path } = item;
                            return (
                                <Link href={`${path}`} key={index} className={`capitalize p-2 ${path === pathName ? 'bg-gradient-to-r from-cyan-500 to-blue-400 rounded-md text-white' : ''}`}>{title}</Link>
                            )
                        })
                    }

                    <div className="user-profile">
                        {
                            user?.email &&
                                user?.email ?
                                <div className="profile relative z-50">
                                    <div className="flex items-center gap-1">
                                        <Image src={user?.profile} alt='profile' height={500} width={500} className='object-cover rounded-full h-[40px] w-[40px]' />
                                        <FaAngleDown onClick={handleOpen} className={`cursor-pointer ${open ? 'rotate-180' : ''}`} />
                                    </div>
                                    <div className="profile-men absolute top-[60px]">
                                        <div className={`bg-blue-400 rounded-md p-2 ${open ? 'block' : 'hidden'}`}>
                                            <ul className='divide divide-y space-y-3'>
                                                <li>
                                                    <Link href='/profile' className='text-white' onClick={handleOpen}>
                                                        <div className="flex items-center gap-1 text-[15px] font-[100]">
                                                            <LiaUserSolid />
                                                            Profile
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li>
                                                    {
                                                        admin === 'admin' ?
                                                            <Link href='/dashboard' className='text-white' onClick={handleOpen}>
                                                                <div className="flex items-center gap-1 text-[15px] font-[100]">
                                                                    <RxDashboard />
                                                                    Dashboard
                                                                </div>
                                                            </Link>
                                                            :
                                                            <Link href='/my-order' className='text-white' onClick={handleOpen}>
                                                                <div className="flex items-center gap-1 text-[15px] font-[100]">
                                                                    <FaShoppingBag />
                                                                    Orders
                                                                </div>
                                                            </Link>
                                                    }
                                                </li>
                                                <li>
                                                    <button className='text-white' onClick={() => {
                                                        handleLogout(),
                                                            handleOpen()
                                                    }}>
                                                        <div className="flex items-center gap-1 text-[15px] font-[100]">
                                                            <MdLogout />
                                                            Logout
                                                        </div>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                :
                                ''
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;