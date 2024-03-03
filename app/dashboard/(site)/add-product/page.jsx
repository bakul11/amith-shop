"use client"
import ProductCart from '@/components/RecentProduct/ProductCart';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';



const page = () => {
    const [search, setSearch] = useState('');
    const [loadding, setLoadding] = useState(true);




    // load all product api
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const fetchingProductData = async () => {

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

    }, [product]);



    return (
        <div className="product my-12">
            {
                loadding ?
                    <div className="loadding grid place-items-center">
                        <h2 className='text-slate-600 mb-2 text-[19px] font-medium'>Loading please wait...</h2>
                        <PropagateLoader
                            color="#f1c40f"
                            size={25}
                        />
                    </div>
                    :
                    <div className="product">
                        {
                            product?.length === 0 ?
                                <div className="product-empty grid place-items-center my-12">
                                    <h2 className='text-slate-800 text-[19px] font-semibold'>Your Product is Empty</h2>
                                    <p className='text-gray-500 text-[15px] mb-2'>Please add products</p>
                                    <Link href='/dashboard/create-product' className='inline-block ease-in-out transition-all duration-[0.5s] hover:bg-rose-500 bg-orange-400 p-3 text-[14px] rounded-md  capitalize text-white font-medium'>
                                        <div className="flex items-center gap-1">
                                            <FaPlus />
                                            add new product
                                        </div>
                                    </Link>
                                </div>
                                :
                                <div className='show-product '>
                                    <div className="flex items-center justify-between flex-wrap gap-5">
                                        <div className="product-title">
                                            <h2 className='text-slate-800 text-[19px] font-semibold'>Product List</h2>
                                            <p className='text-gray-500 text-[15px]'>Manage your products</p>
                                        </div>
                                        <div className="product-btn">
                                            <Link href='/dashboard/create-product' className='inline-block ease-in-out transition-all duration-[0.5s] hover:bg-rose-500 bg-orange-400 p-3 text-[14px] rounded-md  capitalize text-white font-medium'>
                                                <div className="flex items-center gap-1">
                                                    <FaPlus />
                                                    add new product
                                                </div>
                                            </Link>
                                        </div>
                                    </div>


                                    {/* search  */}
                                    <div className="search-box my-8 relative">
                                        <FaSearch className='absolute left-2 top-3 text-gray-500 ' />
                                        <input type="text" value={search} placeholder='Search Products' className='bg-white py-2 pl-8 outline-none ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' onChange={(e) => setSearch(e.target.value)} />
                                    </div>


                                    {/* show product in table  */}
                                    <div className="overflow-auto lg:overflow-hidden">
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='text-[14px] text-left text-slate-700 font-[100] capitalize'>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>#</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>Photo</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>title</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>Price</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    product?.filter((item) => item.title.toLowerCase().includes(search)).map((product, index) => <ProductCart product={product} index={index} />)

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