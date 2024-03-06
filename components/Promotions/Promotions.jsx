"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';

const Promotions = () => {
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
        <div className='bg-gradient-to-r from-blue-400 to-cyan-400'>
            <div className="px-5 lg:px-12 text-center py-24">
                <h3 className='text-3xl font-bold'>Be <span className='text-white'>the first</span> to hear about our latest deals, <br /> offers & promotions</h3>
                <div className="subcribe relative capitalize my-8 lg:w-1/2 mx-auto">
                    <form onSubmit={handleSumitEmail}>
                        <input type="email" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} value={email} className='outline-none p-3 focus:ring-white focus:ring-1 rounded-md ring-0 w-full ring-gray-400 placeholder-gray-400 text-[14px]' required />
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
                                <input type="submit" value="Subscribe Now" className='bg-gradient-to-r from-orange-400 to-red-400 rounded-r-md text-white px-5 py-2 cursor-pointer absolute right-0 top-0 bottom-0' />
                        }
                    </form>
                </div>

                <p className='text-white'> By subscribe you agree to the Design Bundles Terms & Conditions Privacy Policy</p>
            </div>
        </div>
    );
};

export default Promotions;