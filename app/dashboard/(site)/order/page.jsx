"use client"
import RecentProductAnination from '@/components/Animation/RecentProductAnination';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosSearch } from 'react-icons/io';




const page = () => {

    const [search, setSearch] = useState('');
    const [loadding, setLoadding] = useState(false);
    const [users, setUsers] = useState([]);




    useEffect(() => {
        const fetchingUsersData = async () => {
            await fetch('/api/auth/totalUsers')
                .then(res => res.json())
                .then(data => {
                    setUsers(data)
                    setLoadding(false)
                })
                .catch(err => {
                    toast.error(err)
                    setLoadding(false)
                })
        }

        //call function
        fetchingUsersData()

    }, [users]);


    //handle remove email
    const handleRemoveUsers = (id) => {
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
                            users?.length === 0 ?
                                <div className="product-empty grid place-items-center my-12">
                                    <h2 className='text-slate-800 text-[19px] font-semibold'>Customers list is Empty</h2>
                                </div>
                                :
                                <div className='show-product '>
                                    <div className="search-title mb-8 flex items-center flex-wrap gap-3 justify-between">
                                        <div className="title">
                                            <h2 className='text-slate-600 text-[17px] font-semibold'>Customers Orders list</h2>
                                            <p>Manage your order list</p>
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
                                                <tr className='text-[14px]  bg-gradient-to-l from-cyan-500 to-blue-400 text-white rounded-t-md font-[100] text-center capitalize'>
                                                    <th className='border-blue-100 border p-2'>#</th>
                                                    <th className='border-blue-100 border p-2'>Profile</th>
                                                    <th className='border-blue-100 border p-2 '>UserName</th>
                                                    <th className='border-blue-100 border p-2'>Email</th>
                                                    <th className='border-blue-100 border p-2'>Role</th>
                                                    <th className='border-blue-100 border p-2'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    users?.filter((pd) => pd.userName?.toLowerCase().includes(search)).map((item, index) => {
                                                        const { email, _id, profile, role, userName } = item;
                                                        return (
                                                            <tr className='text-[14px] text-[#637381] font-[500] text-center' key={index}>
                                                                <td className='border-blue-100 shadow-sm py-4 px-3'>{index + 1}</td>
                                                                <td className='border-blue-100 shadow-sm py-4 px-3'>
                                                                    <div className="flex items-center justify-center gap-2 flex-wrap">
                                                                        <Image src={profile} alt='logo' height={500} width={500} className='object-cover rounded-full h-[50px] w-[50px]' />
                                                                        <h3 className='capitalize'>{userName}</h3>
                                                                    </div>
                                                                </td>
                                                                <td className='border-blue-100 shadow-sm py-4 px-3 capitalize'>{userName}</td>
                                                                <td className='border-blue-100 shadow-sm py-4 px-3'>{email}</td>
                                                                <td className='border-blue-100 shadow-sm py-4 px-3 capitalize'>{role}</td>
                                                                <td className='border-blue-100 shadow-sm py-4 px-3 text-center'>
                                                                    <FaRegTrashCan className='cursor-pointer text-red-400 inline-block text-center mx-auto' onClick={() => handleRemoveUsers(_id)} />
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