"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '../../../public/assets/login.jpg'
import { useForm } from "react-hook-form"
import { FaArrowRight } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { BsEnvelope } from "react-icons/bs";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const page = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [loadding, setLoadding] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter()


    //handle submit form 
    const onSubmit = (data) => {
        const user = {
            email: data?.email
        }

        setLoadding(true);

        fetch('/api/auth/findAccount', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
              
                if (result?.message) {
                    setError(result?.message);
                    setLoadding(false)
                }
                if (result?.success) {
                    router.push('/create-password')
                    toast.success(result?.message);
                    Cookies.set('userId', result?.user?._id);
                    setLoadding(false);
                    reset()
                    setError('')
                } else {
                    if (result?.error) {
                        toast.error(result?.message);
                        setLoadding(false);
                        setError('')
                    }
                }
            })

    }

    return (
        <div className='login_section'>
            <div className="flex justify-between">
                <div className="login_form w-full md:w-[40%] lg:w-[40%]">
                    <div className="px-5 lg:px-12 py-12">
                        <div className="sign-title my-5">
                            <h1 className='text-2xl font-semibold text-slate-800'>Forgot password?</h1>
                            <p className='text-[15px] font-[400] text-gray-500 my-2'>Don’t warry! it happens. Please enter the address
                                associated with your account.</p>
                        </div>
                        <h2 className='text-orange-500 text-[17px] font-semibold text-center'>{error}</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-item my-2">
                                <label htmlFor="nn" className='text-slate-500 mb-2 font-medium text-[15px]'>Email</label>
                                <div className="relative">
                                    <div className="relative">
                                        <input {...register("email", { required: true })} id='nn' placeholder='Email address' type='email' className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' />
                                        <BsEnvelope className='absolute right-4 top-5 text-gray-500 cursor-pointer' />
                                    </div>
                                </div>
                                {errors.email && <span className='text-red-500'>This field is required</span>}
                            </div>

                            <div className="show_loadding my-5">
                                {
                                    loadding ?

                                        <button className='flex items-center justify-center gap-1 w-full capitalize text-white my-3 font-semibold py-2 rounded-md bg-rose-500' disabled>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span>Processing</span>
                                                <BeatLoader
                                                    color="#FFFFFF"
                                                    speedMultiplier={2}
                                                />
                                            </div>
                                        </button>
                                        :
                                        <button className='flex items-center justify-center gap-2 w-full capitalize text-white my-3 font-semibold py-2 rounded-md bg-orange-400'>
                                            submit
                                            <FaArrowRight />
                                        </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
                {/* logo here  */}
                <div className="login_photo w-[60%] hidden md:block lg:block">
                    <Image src={logo} alt='register-photo' priority={true} className='object-cover h-screen w-full' />
                </div>
            </div>
        </div>
    );
};

export default page;