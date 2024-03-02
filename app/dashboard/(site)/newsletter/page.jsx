"use client"
import RecentProductAnination from '@/components/Animation/RecentProductAnination';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';



const page = () => {
    const [newsletter, setNewsletter] = useState([]);
    const [loadding, setLoadding] = useState(false);


    // load all newsletter api
    useEffect(() => {
        const fetchingNewsletterData = async () => {
            await fetch('/api/newsletter/getall-newsletter')
                .then(res => res.json())
                .then(data => {
                    setNewsletter(data)
                    setLoadding(false)
                })
                .catch(err => {
                    toast.error(err)
                    setLoadding(false)
                })
        }

        //call function
        fetchingNewsletterData()

    }, [newsletter]);


    //handle remove email
    const handleRemoveEmail = async (id) => {
        const confirmRemove = window.confirm('Do you want to remove product');
        if (confirmRemove) {
            await fetch(`/api/newsletter/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data?.success) {
                        toast.success(data?.message);
                    }
                })
                .catch(err => {
                    toast.error(err)
                })
        }
    }



    return (
        <div className="product my-8">
            {
                loadding ?
                    <RecentProductAnination />
                    :
                    <div className="product">
                        {
                            newsletter?.length === 0 ?
                                <div className="product-empty grid place-items-center my-12">
                                    <h2 className='text-slate-800 text-[19px] font-semibold'>Your Newsletter is Empty</h2>
                                </div>
                                :
                                <div className='show-product '>
                                    <div className="title mb-5">
                                        <h2 className='text-slate-600 text-[17px] font-semibold'>Your Newsletter Email</h2>
                                        <p>Manage your subcribe email</p>
                                    </div>

                                    {/* show product in table  */}
                                    <div className="overflow-auto lg:overflow-hidden">
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='text-[14px] text-left text-slate-700 font-[100] capitalize'>
                                                    <th className='border-blue-100 border p-2'>#</th>
                                                    <th className='border-blue-100 border p-2'>Email</th>
                                                    <th className='border-blue-100 border p-2'>Time</th>
                                                    <th className='border-blue-100 border p-2'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    newsletter?.map((item, index) => {
                                                        const { email, time, _id } = item;
                                                        return (
                                                            <tr className='text-[14px] text-[#637381] font-[500] capitalize' key={index}>
                                                                <td className='border-blue-100 border-b-[1px] p-2'>{index + 1}</td>
                                                                <td className='border-blue-100 border-b-[1px] p-2'>{email}</td>
                                                                <td className='border-blue-100 border-b-[1px] p-2'>{time}</td>
                                                                <td className='border-blue-100 border-b-[1px] p-2'>
                                                                    <FaTrash className='cursor-pointer text-red-400' onClick={() => handleRemoveEmail(_id)} />
                                                                </td>

                                                            </tr>
                                                        )
                                                    })

                                                }

                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                        }
                    </div>


            }
        </div>

    );
};

export default page;