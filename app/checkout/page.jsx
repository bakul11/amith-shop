"use client"
import useActiveUser from '@/hooks/useActiveUser';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const page = () => {
    const [user] = useActiveUser();
    const navigate = useRouter();

    const { cart } = useSelector(state => state.cart);

    const userInfo = {
        userName: user?.userName,
        profile: user?.profile
    }

    const storeData = {
        userId: user?._id,
        userInfo: userInfo,
        cart: cart
    }





    //store data

    const handlePostData = () => {
        fetch('/api/order/post-orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(storeData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data?.success) {
                    toast.success(data?.message)
                } else {
                    if (data?.error) {
                        toast.error(data?.message)
                    }
                }
            })
    }





    return (
        <div className='checkout-section my-12'>
            <div className="px-5 lg:px-12">
                <h3 className='text-xl'> Hello, <span className='text-orange-400 font-semibold capitalize'>{user?.userName}</span> Welcome to checkout page</h3>

                <button className='bg-blue-400 p-2 rounded-sm text-white capitalize' onClick={handlePostData}>confirm order</button>
            </div>
        </div>
    );
};

export default page;