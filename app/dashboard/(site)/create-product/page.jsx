"use client"
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useActiveUser from '@/hooks/useActiveUser';
import LoaddingAnimation from '@/components/Animation/LoaddingAnimation';

const ProductModalData = () => {
    const [title, setTitle] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [oldPrice, setOldPrice] = useState(0);
    const [photo, setPhoto] = useState('');
    const [review, setReview] = useState('');
    const [loadding, setLoadding] = useState(false);
    const router = useRouter();
    const [user] = useActiveUser();






    //handle review photo
    const handleReview = (event) => {
        setPhoto(event.target.files[0])
        setReview(URL.createObjectURL(event.target.files[0]));
    }



    //handle submit form 
    const handleSubmit = async (event) => {
        event.preventDefault();

        // image upload api 
        const formData = new FormData();
        formData.append('image', photo)
        setLoadding(true);
        await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_SCRECT_KEY}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data?.success) {
                    setLoadding(false);
                    const imageUrl = data.data.url;
                    const storeData = {
                        title,
                        newPrice,
                        oldPrice,
                        photo: imageUrl
                    }
                
                    setLoadding(true);
                    fetch(`/api/product/post`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify(storeData)
                    })
                        .then(res => res.json())
                        .then(result => {
                         
                            if (result.success) {
                                toast.success(result?.message)
                                router.push('/dashboard/add-product')
                                setLoadding(false);
                                setReview('')
                                setTitle('')
                                setNewPrice('')
                                setOldPrice('')

                            } else {
                                if (result?.error) {
                                    toast.error(result?.message)
                                    setLoadding(false);
                                }
                            }
                        })

                }

            })




    }







    return (
        <section className='my-12'>
            <>
                {
                    user?.email ?
                        <div className='add-product'>
                            <div className="product-title mb-8">
                                <h2 className='text-slate-800 text-[19px] font-semibold'>Product Add</h2>
                                <p className='text-gray-500 text-[14px]'>Create new product</p>
                            </div>
                            {/* add prouct form  */}

                            <form onSubmit={handleSubmit} >

                                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-2">

                                    <div className="form-item">
                                        <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Title</label>
                                        <input input id='ee' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Name of Product' onChange={(e) => setTitle(e.target.value)} required={true} />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="eeee" className='text-slate-500 my-1 font-medium text-[14px]'>New Price</label>
                                        <input input id='eeee' type='number' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Price' onChange={(e) => setNewPrice(e.target.value)} required={true} />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="eee" className='text-slate-500 my-1 font-medium text-[14px]'>Discount Price</label>
                                        <input input id='eee' type='number' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Discount' onChange={(e) => setOldPrice(e.target.value)} required={true} />
                                    </div>


                                </div>

                                <div className="form-item my-5">
                                    <label htmlFor="pppp" className='text-slate-500 my-1 font-medium text-[14px]'>Product Image</label>
                                    {
                                        review?.length ?
                                            <>
                                                <Image src={review} alt='photo' height={200} width={200} className='object-cover rounded-md h-[150px] w-[150px]' />
                                            </>
                                            :

                                            <div className="file-upload text-center my-8">
                                                <label htmlFor="pppp">
                                                    <IoCloudUploadOutline className='text-orange-500 text-3xl cursor-pointer flex items-center justify-center w-full' />
                                                    <p className='text-gray-500 text-[14px] text-center'>Drag & drop a file to upload</p>
                                                    <input id='pppp' type='file' className='bg-white p-2 my-2 text-[14px] hidden outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Name of Product' onChange={handleReview} required={true} />
                                                </label>
                                            </div>
                                    }
                                </div>

                                <div className="form-submit my-20">
                                    {
                                        loadding ?

                                            <button className='bg-rose-500 text-white rounded-md p-2 text-[14px] capitalize font-medium' disabled>
                                                <div className="flex items-center gap-2">
                                                    Processing..
                                                    <ClipLoader color="#FFFFFF" speedMultiplier={1} size={20} />
                                                </div>
                                            </button>
                                            :
                                            <button className='bg-orange-400 text-white rounded-md p-3 text-[14px] capitalize font-medium'>
                                                <div className="flex items-center gap-1">
                                                    add product
                                                    <FaArrowRight />
                                                </div>
                                            </button>
                                    }
                                </div>
                            </form >

                        </div >
                        :
                        <div className="py-5">
                            <LoaddingAnimation />
                        </div>
                }

            </>
        </section>

    );
};

export default ProductModalData;