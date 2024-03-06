"use client"
import RecentProductAnination from '@/components/Animation/RecentProductAnination';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosSearch } from 'react-icons/io';




const page = () => {
    const [newsletter, setNewsletter] = useState([]);
    const [loadding, setLoadding] = useState(false);
    const [search, setSearch] = useState('');


    // load all newsletter api
    useEffect(() => {
        fetch('/api/newsletter/getall-newsletter')
            .then(res => res.json())
            .then(data => {
                setNewsletter(data)
                setLoadding(false)
            })
            .catch(err => {
                toast.error(err)
                setLoadding(false)
            })
    }, [newsletter])


    //handle remove email
    const handleRemoveEmail = (id) => {
        const confirmRemove = window.confirm('Do you want to remove this item?');
        if (confirmRemove) {
            fetch(`/api/newsletter/remove/${id}`, {
                method: 'DELETE'
            })
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
                                    <div className="search-title mb-8 flex items-center flex-wrap gap-3 justify-between">
                                        <div className="title">
                                            <h2 className='text-slate-600 text-[17px] font-semibold'>Total Users  List</h2>
                                            <p>Manage your userlist</p>
                                        </div>
                                        <div className="search relative">
                                            <input type="text" placeholder='Search here....' className='outline-none pl-7 py-3 focus:ring-orange-500 focus:ring-1 rounded-lg ring-1 w-full block ring-blue-400 placeholder-gray-400 text-[14px]' value={search} onChange={(e) => setSearch(e.target.value)} required />
                                            <IoIosSearch className='text-2xl text-gray-400  cursor-pointer absolute left-1 top-3' />
                                        </div>
                                    </div>

                                    {/* show product in table  */}
                                    <div className="overflow-auto lg:overflow-hidden">
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='text-[14px]  text-white bg-gradient-to-l from-cyan-500 to-blue-400 rounded-t-md font-[100] text-center capitalize'>
                                                    <th className='border-blue-100 border p-2'>#</th>
                                                    <th className='border-blue-100 border p-2'>Email</th>
                                                    <th className='border-blue-100 border p-2'>Time</th>
                                                    <th className='border-blue-100 border p-2'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    newsletter?.filter(pd => pd?.email?.toLowerCase().includes(search)).map((item, index) => {
                                                        const { email, time, _id } = item;
                                                        return (
                                                            <tr className='text-[14px] text-[#637381] font-[500] text-center' key={index}>
                                                                <td className='border-blue-100 shadow-sm py-4 px-3'>{index + 1}</td>
                                                                <td className='border-blue-100 shadow-sm py-4 px-3'>{email}</td>
                                                                <td className='border-blue-100 shadow-sm py-4 px-3'>{time}</td>
                                                                <td className='border-blue-100 shadow-sm py-4 px-3'>
                                                                    <FaRegTrashCan className='cursor-pointer text-red-400 inline-block text-center mx-auto' onClick={() => handleRemoveEmail(_id)} />
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