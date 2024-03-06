"use client"
import RecentProductAnination from '@/components/Animation/RecentProductAnination';
import useActiveUser from '@/hooks/useActiveUser';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaCheck } from 'react-icons/fa';


const page = () => {
    const [user] = useActiveUser();
    const id = user?._id;
    const [pd, setPd] = useState([]);
    const [loadding, setLoadding] = useState(true);



    useEffect(() => {
        const loadProduct = async () => {
            await fetch(`/api/order/userbase-order/${id}`)
                .then(res => res.json())
                .then(data => {
                    setPd(data)
                    setLoadding(false)
                })
                .catch(err => {
                    setLoadding(false)
                })
        }

        loadProduct();
    }, [id, pd])

    return (
        <div className='my-12 px-12 lg:px-12 lg:w-[75%] w-full'>
            <h3 className='mb-5 font-semibold text-slate-700 text-xl'>My Orders History</h3>

            {
                loadding ?
                    <RecentProductAnination />
                    :
                    <>
                        {
                            pd?.length === 0 ?
                                <h3 className='text-gray-500'>Your order is empty</h3>
                                :

                                <div className="show-product bg-white rounded-md p-5">
                                    <div className="overflow-auto lg:overflow-hidden">
                                        {
                                            pd && pd?.map((item, index) => {
                                                const { cart } = item;
                                                return (
                                                    <div className="show space-y-4 divide divide-y divide-dotted divide-blue-400" key={index}>
                                                        {
                                                            cart?.map((pd, num) => {
                                                                const { title, photo, newPrice } = pd;
                                                                return (
                                                                    <div className="show-product" key={num}>
                                                                        <div className="flex items-center justify-between gap-2 flex-wrap">
                                                                            <div className="logo">
                                                                                <Image src={photo} alt='logo' height={500} width={500} priority={true} className='object-cover rounded-sm h-[100px] w-[100px]' />
                                                                            </div>
                                                                            <div className="title-pd">
                                                                                <h3 className='capitalize text-gray-500'>{title?.length > 100 ? title?.slice(0, 300) + '...' : title}</h3>
                                                                            </div>
                                                                            <div className="price-pd">
                                                                                <h3 className='capitalize text-gray-500'>${newPrice}.00</h3>
                                                                            </div>
                                                                            <div className="success">
                                                                                <div className="flex items-center justify-between gap-2 flex-wrap text-green-400">
                                                                                    <FaCheck />
                                                                                    <span>  Completed</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="remove-all my-4">
                                            <Link href='/' className='bg-blue-400 font-semibold  inline-block float-end text-white hover:bg-orange-500 transition-all ease-in-out duration-[0.5s] rounded-md py-2 px-3 outline-none'>
                                                <div className="flex items-center justify-end gap-1">
                                                    <span>Continue Shopping</span>
                                                    <FaArrowRight />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                        }
                    </>

            }
        </div>
    );
};

export default page;