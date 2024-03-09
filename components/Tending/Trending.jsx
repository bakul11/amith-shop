"use client"
import { addToCart } from '@/redux/slice/cartSlice';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';
import { MdShoppingCartCheckout } from "react-icons/md";
import { useDispatch } from 'react-redux';
import TendingLoadding from '../Animation/TendingLoadding';
import { useRouter } from 'next/navigation';









const Trending = () => {
    const [tending, setTending] = useState([]);
    const [loadding, setLoadding] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();


    // all data fetching here api 
    const [currentPage, setCurrentPage] = useState(8);
    const [totalPages, setTotalPages] = useState(1);




    useEffect(() => {
        const fetchingData = async () => {
            setLoadding(true)
            await fetch(`/api/product/get-allproducts?page=${currentPage}`)
                .then(res => res.json())
                .then(data => {
                    setTending(data?.product)
                    setTotalPages(data?.totalPages)
                    setLoadding(false)
                })
                .catch(err => {
                    toast.error(err)
                    setLoadding(false)
                })
        }

        //call function
        fetchingData()

    }, [currentPage]);


    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };



    return (
        <section className='tending-section'>
            <div className="px-5 lg:px-12 py-5 mb-12">
                <h2 className='font-bold text-slate-800 text-xl my-5'>Trending right now</h2>

                {
                    loadding ?
                        <div className="animation">
                            <TendingLoadding />
                            <div className="my-5"></div>
                            <TendingLoadding />
                        </div>

                        :
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
                            {
                                tending && tending?.map((item, index) => {
                                    const { title, newPrice, oldPrice, photo, _id } = item;

                                    return (
                                        <div className="bg-white shadow-sm group rounded-md hover:translate-y-2  relative duration-[0.5s] transition-all ease-in-out" key={index}>
                                            <Image src={photo} alt='design logo' className='object-cover rounded-t-md w-full' height={500} width={500} />
                                            <div className="tending-content p-3">
                                                <div className="tending-title">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className='main-title my-3 hover:text-green-500 cursor-pointer' onClick={() => router.push(`/product/details/${_id}`)}>{title}</h3>
                                                        <FaCheckCircle className='text-green-500' />
                                                    </div>
                                                </div>
                                                <div className="price ">
                                                    <div className="flex items-center justify-between">
                                                        <p className='text-slate-800 text-[14px]'>In <span className='text-blue-500'>fonts</span></p>
                                                        <h4 className='text-rose-500 font-semibold'>$ {newPrice}.00 <span className='text-slate-800'><del>$ {oldPrice}.00</del></span></h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="addtocart">
                                                <button className='bg-gradient-to-r from-rose-500 to-orange-500 text-white p-2 rounded-md w-full transition-all ease-in-out absolute right-0 bottom-20 left-0 duration-[0.5s] hidden  group-hover:block' onClick={() => dispatch(addToCart(item))}>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <MdShoppingCartCheckout />
                                                        <span>Add to Cart</span>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }


                {/* pagination start here  */}
                <div>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>


            </div>

        </section>
    );
};

export default Trending;