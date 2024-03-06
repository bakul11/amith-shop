"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaAngleRight, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import logo from '../../public/assets/cb.webp'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';

const Footer = () => {
    const [email, setEmail] = useState('')
    const [loadding, setLoadding] = useState(false)
    const router = useRouter();

    //handle submit email 
    const handleSumitEmail = async (event) => {
        event.preventDefault();

        setLoadding(true)
        await fetch('/api/newsletter/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
            .then(res => res.json())
            .then(data => {
            
                if (data?.error?.includes('E11000 duplicate key error collection')) {
                    toast.error('already use this email')
                    setLoadding(false)
                }
                if (data?.success) {
                    toast.success(data?.message);
                    setEmail('')
                    router.push('/');
                    setLoadding(false)
                } else {
                    if (data?.error) {
                        toast.error(data?.message2)
                        setLoadding(false)
                    }
                }
            })
    }

    return (
        <div className='bg-slate-800'>
            <div className='px-5 lg:px-12 pt-8 pb-5'>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
                    <div className="footer-item">
                        <Link href='/' className='font-bold text-slate-800 capitalize flex items-center gap-2'>
                            <Image src={logo} alt='logo' height={500} width={500} className='object-cover rounded-full h-[100px] w-[200px]' />
                        </Link>
                        <p className='text-gray-400 text-[15px] mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero sed aperiam quam, nisi rem sit deserunt sequi mollitia quae voluptatum rerum at ipsum facilis eos.</p>
                    </div>
                    <div className="footer-item">
                        <h3 className='capitalize text-white font-semibold text-[16px] mb-3'>usefull Links</h3>
                        <div className="fot-menu">
                            <ul className='space-y-1'>
                                <li>
                                    <Link href='/about' className='text-gray-400 text-[15px] inline-block hover:text-white hover:ml-2 transition-all ease-in-out duration-[0.5s]'>
                                        <div className="flex items-center gap-1">
                                            <FaAngleRight />
                                            <span>About Us</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/contact' className='text-gray-400 text-[15px] inline-block hover:text-white hover:ml-2 transition-all ease-in-out duration-[0.5s]'>
                                        <div className="flex items-center gap-1">
                                            <FaAngleRight />
                                            <span>Contact Us</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/services' className='text-gray-400 text-[15px] inline-block hover:text-white hover:ml-2 transition-all ease-in-out duration-[0.5s]'>
                                        <div className="flex items-center gap-1">
                                            <FaAngleRight />
                                            <span>Our Services</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/' className='text-gray-400 text-[15px] inline-block hover:text-white hover:ml-2 transition-all ease-in-out duration-[0.5s]'>
                                        <div className="flex items-center gap-1">
                                            <FaAngleRight />
                                            <span>Terms & Conditions</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/support' className='text-gray-400 text-[15px]  inline-block hover:text-white hover:ml-2 transition-all ease-in-out duration-[0.5s]'>
                                        <div className="flex items-center gap-1">
                                            <FaAngleRight />
                                            <span>Support Center</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-item">
                        <h3 className='capitalize text-white font-semibold text-[16px] mb-3'>quick Links</h3>
                        <div className="fot-menu">
                            <ul className='space-y-1'>
                                <li>
                                    <Link href='/about' className='text-gray-400 text-[15px] inline-block hover:text-white hover:ml-2 transition-all ease-in-out duration-[0.5s]'>
                                        <div className="flex items-center gap-1">
                                            <FaAngleRight />
                                            <span>About Us</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/contact' className='text-gray-400 text-[15px] inline-block hover:text-white hover:ml-2 transition-all ease-in-out duration-[0.5s]'>
                                        <div className="flex items-center gap-1">
                                            <FaAngleRight />
                                            <span>Contact Us</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/services' className='text-gray-400 text-[15px] inline-block hover:text-white hover:ml-2 transition-all ease-in-out duration-[0.5s]'>
                                        <div className="flex items-center gap-1">
                                            <FaAngleRight />
                                            <span>Our Services</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/' className='text-gray-400 text-[15px] inline-block hover:text-white hover:ml-2 transition-all ease-in-out duration-[0.5s]'>
                                        <div className="flex items-center gap-1">
                                            <FaAngleRight />
                                            <span>Terms & Conditions</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/support' className='text-gray-400 text-[15px]  inline-block hover:text-white hover:ml-2 transition-all ease-in-out duration-[0.5s]'>
                                        <div className="flex items-center gap-1">
                                            <FaAngleRight />
                                            <span>Support Center</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-item">
                        <h3 className='capitalize text-white font-semibold text-[16px] mb-3'>Newsletter</h3>
                        <p className='text-gray-400 text-[15px] my-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero sed aperiam quam</p>
                        <div className="subcribe relative capitalize my-5">
                            <form onSubmit={handleSumitEmail}>
                                <input type="email" placeholder='Email Address' value={email} className='outline-none p-2 focus:ring-white focus:ring-1 rounded-sm ring-0 w-full ring-gray-400 placeholder-gray-400 text-[14px]'
                                    onChange={(e) => setEmail(e.target.value)} required />
                                {
                                    loadding ?
                                        <p className='bg-gradient-to-r from-pink-400 to-rose-500 rounded-r-md text-white px-5 py-2 cursor-pointer absolute right-0 top-0 bottom-0' disabled>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span>Please wait..</span>
                                                <BeatLoader
                                                    color="#FFFFFF"
                                                    speedMultiplier={2}
                                                />
                                            </div>
                                        </p>
                                        :
                                        <input type="submit" value="Subscribe" className='bg-gradient-to-r from-cyan-500 to-blue-400 text-white p-2 cursor-pointer rounded-sm absolute right-0 top-0 bottom-0' />
                                }

                            </form>
                        </div>
                        <div className="flow-us mt-5">
                            <ul className='flex items-center gap-2'>
                                <li>
                                    <Link href='' target='_blank' className='bg-[#395797] rounded-sm text-white cursor-pointer hover:bg-orange-400 h-6 w-6  grid items-center justify-center'>
                                        <FaFacebookF className='transition-all ease-in-out duration-[0.5s] hover:rotate-180' size={20} />
                                    </Link>

                                </li>
                                <li>
                                    <Link href='' target='_blank' className='bg-[#C236A3] rounded-sm text-white cursor-pointer hover:bg-orange-400 h-6 w-6  grid items-center justify-center'>
                                        <FaInstagram className='transition-all ease-in-out duration-[0.5s] hover:rotate-180' size={20} />
                                    </Link>

                                </li>
                                <li>
                                    <Link href='' target='_blank' className='bg-[#0178BA] rounded-sm text-white cursor-pointer hover:bg-orange-400 h-6 w-6  grid items-center justify-center'>
                                        <FaLinkedinIn className='transition-all ease-in-out duration-[0.5s] hover:rotate-180' size={20} />
                                    </Link>

                                </li>
                                <li>
                                    <Link href='' target='_blank' className='bg-[#4EADF1] rounded-sm text-white cursor-pointer hover:bg-orange-400 h-6 w-6  grid items-center justify-center'>
                                        <FaTwitter className='transition-all ease-in-out duration-[0.5s] hover:rotate-180' size={20} />
                                    </Link>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="line bg-gray-500 w-full h-[1px] mt-12"></div>
                <div className="flex items-center justify-between gap-2 flex-wrap my-5">
                    <div className="copyright mt-2 ">
                        <p className='text-gray-400'>copyright ©{new Date().getFullYear()} amith dev. all rights reserved</p>
                    </div>
                    <div className="design-by">
                        <div className="div text-[14px]">
                            <span className='text-gray-400'>Design By - </span><Link href='' target='_blank' className='text-blue-400 font-medium'>Bakul Ray</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;