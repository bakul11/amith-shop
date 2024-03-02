'use client'
import React, { useEffect, useState } from 'react';
import { LuUsers2 } from "react-icons/lu";
import { RiWechatPayFill } from "react-icons/ri";
import { TbZoomReset } from "react-icons/tb";
import useActiveUser from '@/hooks/useActiveUser';
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import RecentProduct from '../RecentProduct/RecentProduct';
import TendingLoadding from '../Animation/TendingLoadding';









const Overview = () => {
    const [user] = useActiveUser();
    const [loadding, setLoadding] = useState(false);

    // load all product api
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const fetchingProductData = async () => {
            setLoadding(true)
            await fetch('/api/product/get-allproducts')
                .then(res => res.json())
                .then(data => {
                    setProduct(data)
                    setLoadding(false)
                })
                .catch(err => {
                    toast.error(err)
                    setLoadding(false)
                })
        }

        //call function
        fetchingProductData()

    }, []);


    // load all newsletter api
    const [newsletter, setNewsletter] = useState([]);
    useEffect(() => {
        const fetchingNewsletterData = async () => {
            setLoadding(true)
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

    }, []);

    // load all users api
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchingUsersData = async () => {
            setLoadding(true)
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

    }, []);


    // load all orders api
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchingOrderData = async () => {
            setLoadding(true)
            await fetch('/api/order/get-allOrders')
                .then(res => res.json())
                .then(data => {
                    setOrders(data)
                    setLoadding(false)
                })
                .catch(err => {
                    toast.error(err)
                    setLoadding(false)
                })
        }

        //call function
        fetchingOrderData()

    }, []);



    // load all data
    const totalProduct = product?.length;
    const totalEmail = newsletter?.length;
    const totalUsers = users?.length;
    const totalOrders = orders?.length;


    const overviewData = [
        {
            title: 'Subscribing Newsletter',
            digit: totalEmail,
            icon: <FaEnvelopeCircleCheck />
        },
        {
            title: 'Total SignIn Users ',
            digit: totalUsers,
            icon: <LuUsers2 />
        },
        {
            title: 'Stock Total Products ',
            digit: totalProduct,
            icon: <RiWechatPayFill />
        },
        {
            title: 'Customers Orders',
            digit: totalOrders,
            icon: <TbZoomReset />
        }
    ]

    return (
        <section className='my-12'>
            <div className="overview">
                {
                    user?.email ?
                        <div className='overview'>
                            <h1 className='text-slate-800 font-semibold text-xl mb-5'>Dashboard Overview</h1>
                            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
                                {
                                    overviewData?.map((item, index) => {
                                        const { title, digit, icon } = item;
                                        return (
                                            <div className="shadow-lg rounded-md px-2 py-8 overview-data hover:translate-y-2 ease-linear transition-all duration-[0.5s] overview-item" key={index}>
                                                <div className="flex items-center flex-wrap gap-2 ">
                                                    <div className="overview-logo">
                                                        <h3 className='bg-blue-100 text-orange-400 w-[50px] h-[50px] text-2xl rounded-full grid place-items-center'>{icon}</h3>
                                                    </div>
                                                    <div className="overview-title">
                                                        <h3 className='text-white font-bold text-[40px]'>{digit}</h3>
                                                        <p className='text-gray-200 text-[14px]'>{title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )

                                    })
                                }
                            </div>
                        </div>
                        :
                        <TendingLoadding />
                }
            </div>
            <div className="recent-product">
                <RecentProduct />
            </div>
        </section>
    );
};

export default Overview;