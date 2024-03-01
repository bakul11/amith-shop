"use client"
import useActiveUser from '@/hooks/useActiveUser';
import { decrementQty, incrementQty, removeFormCart } from '@/redux/slice/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowRightLong, FaRegTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [user] = useActiveUser();
    const router = useRouter();


    //total calculation
    const getTotal = () => {
        let totalPrice = 0;
        let totalQuantity = 0;
        cart?.map((item) => {
            totalQuantity = totalQuantity + item.quantity;
            totalPrice = totalPrice + (item.newPrice * item.quantity)
        })
        return { totalPrice, totalQuantity }
    }

    return (
        <div className='cart-section my-12'>
            <div className="px-5 lg:px-12">
                <div className="flex items-start justify-between flex-wrap gap-5">
                    <div className="cart-list lg:w-[60%]">
                        <h2 className='font-bold mb-8 text-xl'>Your Shopping Cart ({getTotal()?.totalQuantity} items) : $ {getTotal()?.totalPrice}.00</h2>
                        <div className="show-cart space-y-8">
                            {
                                cart && cart?.map((item, index) => {
                                    const { title, oldPrice, newPrice, quantity, photo, _id } = item;
                                    return (
                                        <div className="shadow-sm my-5 p-2" key={index}>
                                            <div className="flex items-center justify-between flex-wrap gap-5">
                                                <div className="logo">
                                                    <Image src={photo} alt='logo' height={500} width={500} className='object-cover h-[100px] w-[200px]' />
                                                </div>
                                                <div className="cart-title">
                                                    <h3 className='main-title'>{title}</h3>
                                                    <h3 className='my-3'>Price : ${newPrice}.00 <span className='text-red-500 pl-5'><del>${oldPrice}</del></span></h3>
                                                    <div className="flex items-center gap-2">
                                                        <button className='bg-blue-300 text-white px-2 rounded-md' onClick={() => dispatch(incrementQty(_id))}>+</button>
                                                        <p>{quantity}</p>
                                                        <button className='bg-blue-300 text-white px-2 rounded-md' onClick={() => dispatch(decrementQty(_id))}>-</button>
                                                    </div>
                                                </div>
                                                <div className="cart-remove">
                                                    <FaRegTrashCan className='text-rose-400 cursor-pointer' onClick={() => dispatch(removeFormCart(_id))} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="cart-checkout bg-white shadow-sm rounded-md lg:w-[20%] p-2 space-y-5 divide-y divide-dashed divide-blue-400">
                        <h2 className='font-semibold text-slate-800 mb-3'>Order Details</h2>
                        <h4>Items : <span className='float-right'>{getTotal()?.totalQuantity} items</span></h4>
                        <h4>Sub total : <span className='float-right'>${getTotal()?.totalPrice}.00</span></h4>
                        <h4 className='font-bold text-slate-800'>Grand total Amount: <span className='float-right'>${getTotal()?.totalPrice}.00</span></h4>
                        <Link href='/checkout' className='rounded-[50px] px-5 py-2 bg-gradient-to-r from-rose-400 to-orange-400  inline-block text-center mx-auto text-white my-5'>
                            <div className="flex items-center justify-center gap-2">
                                {
                                    user?.email ?
                                        <span>Continue to Payment</span>
                                        :
                                        <span onClick={() => router.push('/login')}>Login first Continue</span>
                                }
                                <FaArrowRightLong />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default page;