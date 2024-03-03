"use client"
import LoaddingAnimation from '@/components/Animation/LoaddingAnimation';
import { addToCart } from '@/redux/slice/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdShoppingCartCheckout } from 'react-icons/md';
import { useDispatch } from 'react-redux';

const page = ({ params }) => {
    const id = params.id;
    const [pd, setPd] = useState({});
    const [loadding, setLoadding] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchingData = async () => {
            setLoadding(true)
            await fetch(`/api/product/product-details/${id}`)
                .then(res => res.json())
                .then(data => {
                    setPd(data)
                    setLoadding(false)
                    console.log(data);
                })
                .catch(err => {
                    toast.error(err)
                    setLoadding(false)
                })
        }

        //call function
        fetchingData()

    }, [id]);


    const { title, photo, oldPrice, newPrice } = pd;

    return (
        <div className='px-5 lg:px-12 my-12'>
            {
                loadding ?
                    <LoaddingAnimation />
                    :
                    <div className="flex items-center  gap-5  flex-wrap">
                        <div className="details-logo w-[60%]">
                            <div className="slide-menu my-5">
                                <ul className='flex items-center gap-2'>
                                    <li>
                                        <Link href='/' className='text-slate-700'>Home</Link>
                                    </li>
                                    <li>
                                        <p>/</p>
                                    </li>
                                    <li>
                                        <h2 className='text-blue-400'>{title}</h2>
                                    </li>
                                </ul>
                            </div>
                            <Image src={photo} alt='logo' height={500} width={500} className='object-cover rounded-sm' />
                            <div className="product-des">
                                <h2 className='text-slate-700 mt-5 font-bold text-xl '>More information on this Design</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quos dolorum voluptatibus deserunt alias error, praesentium iusto eius non nobis.</p>
                            </div>
                        </div>
                        <div className="pd-content w-[20%]">
                            <h3 className='text-xl font-bold text-state-700'>{title}</h3>
                            <h4 className='text-rose-500 font-semibold text-[18px] my-3'>Price : $ {newPrice}.00 <span className='text-slate-800'><del>$ {oldPrice}.00</del></span></h4>
                            <div className="addtocart">
                                <button className='bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:bg-blue-400 p-2 rounded-md w-full transition-all ease-in-out  duration-[0.5s]' onClick={() => dispatch(addToCart(pd))}>
                                    <div className="flex items-center justify-center gap-1">
                                        <MdShoppingCartCheckout />
                                        <span>Add to Cart</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default page;