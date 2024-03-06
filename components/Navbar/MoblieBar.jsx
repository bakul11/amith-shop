"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { MdLogout, MdShoppingCartCheckout } from "react-icons/md";
import { FaAngleDown, FaBars, FaShoppingBag, FaUserCircle, FaUserLock } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import logo from '../../public/assets/cb.webp'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import useActiveUser from '@/hooks/useActiveUser';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { LiaUserSolid } from 'react-icons/lia';
import { RxDashboard } from 'react-icons/rx';
import { BeatLoader } from 'react-spinners';




// all mobile menu 
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



const MobileBar = () => {
    const { cart } = useSelector(state => state.cart);

    const pathName = usePathname();
    const router = useRouter();
    const [user] = useActiveUser();
    const admin = user?.role;

    //Handle show hide profile 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    //Handle toggle menu bar
    const [toggle, setToggle] = useState(false);
    const handleToggleMenuBar = () => setToggle(!toggle);


    //Handle Search Button
    const [toggleSearch, setToggleSearch] = useState(false);
    const handleShowSearchbar = () => setToggleSearch(!toggleSearch);



    // Handle search Product Items
    const [product, setProduct] = useState([]);
    const [loadding, setLoadding] = useState(false);

    const [search, setSearch] = useState('');

    const handleSearchItem = async (event) => {
        event.preventDefault();

        setLoadding(true)
        await fetch(`/api/product/search-product?search=${search}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoadding(false);
                if (data?.length === 0) {
                    toast.error('Product not found !')
                }
                setSearch('')
            }).catch(err => {
                setLoadding(false);
                setSearch('')
            })
    }

    //handle logout function 
    const handleLogout = () => {
        Cookies.remove('user');
        router.push('/');
        toast.success('Logout successfully done')
    }

    return (
        <div className='top-section lg:hidden block'>
            <div className="bg-white">
                <div className="flex items-center justify-between shadow-lg px-5">

                    {/* left side logo */}
                    <div className="login-box mb-5 w-full ">
                        <Link href='/' className='font-bold text-slate-800 capitalize inline-block  gap-2'>
                            <Image src={logo} alt='logo' height={500} width={500} className='object-cover rounded-full h-[100px] w-[200px]' />
                        </Link>
                    </div>

                    {/* right side menu  */}
                    <div className="card-login w-full">
                        <div className="flex items-center justify-between gap-3">

                            {/* search start here  */}
                            <div className="searchbar">
                                <IoIosSearch className='text-2xl text-slate-800 cursor-pointer' onClick={handleShowSearchbar} />
                            </div>


                            {/* cart start here  */}
                            <div className="cart-button relative">
                                <Link href='/cart'>
                                    <MdShoppingCartCheckout className='text-2xl text-slate-950' />
                                    <p className='bg-blue-400 absolute -top-4 -right-2 rounded-full text-white w-5 h-5 text-center'>{cart?.length}</p>
                                </Link>

                            </div>

                            {/* user profile start here  */}
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
                                        <div className="loginBtn">
                                            <Link href='/login' className='bg-gradient-to-r from-cyan-500 to-blue-400 text-white rounded-[50px] p-2 inline-block'>
                                                <div className="flex items-center gap-2">
                                                    <FaUserCircle className='text-md' />
                                                    Login
                                                </div>
                                            </Link>
                                        </div>
                                }
                            </div>

                            {/* menu start here  */}
                            <div className="slide-menu">
                                <div className="relative z-50">
                                    <button className=' bg-orange-400 text-white p-2 rounded-md ' onClick={handleToggleMenuBar}>
                                        <FaBars className='cursor-pointer' />
                                    </button>

                                    <div className={`mobile-menu bg-gradient-to-r from-rose-400 to-orange-400 w-[200px] rounded-md p-2 absolute right-0 top-10 ${toggle ? 'block' : 'hidden'}`}>
                                        {
                                            menuData && menuData?.map((item, index) => {
                                                const { title, path } = item;
                                                return (
                                                    <Link href={`${path}`} key={index} className={`capitalize block p-2 text-white ${path === pathName ? 'bg-gradient-to-r from-cyan-500 to-blue-400 rounded-md' : ''}`}>{title}</Link>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
                <div className="full-search px-5">
                    <div className={`subcribe relative capitalize my-8 w-full ${toggleSearch ? 'block' : 'hidden'}`}>
                        <form onSubmit={handleSearchItem}>
                            <input type="text" placeholder='Search Here...' className='outline-none pl-8 py-3 focus:ring-orange-500 focus:ring-1 rounded-[50px] ring-1 w-full block ring-blue-400 placeholder-gray-400 text-[14px]' value={search} onChange={(e) => setSearch(e.target.value)} required />
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
                        </form>

                        {/* Show Search Product UI  */}

                        <div className={`${product?.length === 0 ? '' : 'shadow-lg z-50 bg-white rounded-md absolute top-12 left-0 py-5 right-0 overflow-y-auto max-h-[200px]'}`}>
                            <div className="divide px-3 divide-y divide-dashed divide-blue-400 space-y-4">
                                {

                                    product?.map((pd, index) => {
                                        const { title, newPrice, photo, _id } = pd;
                                        return (

                                            <Link href={`/product/details/${_id}`} className="flex items-center gap-2 " key={index}>
                                                <div className="pd-logo">
                                                    <Image src={photo} alt='logo' height={500} width={500} className='object-cover rounded-sm h-[100px] w-[100px]' />
                                                </div>
                                                <div className="pd-title">
                                                    <h3 className='text-slate-600 text-[17px]'>{title}</h3>
                                                    <p className='text-gray-500'>Price : ${newPrice}.00</p>
                                                </div>
                                            </Link>

                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileBar;