"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { BsPlusSquare } from "react-icons/bs";
import { HiShoppingBag } from "react-icons/hi2";
import { TbBrandShopee } from "react-icons/tb";
import { FaMeteor } from "react-icons/fa";
import { FaEnvelopeCircleCheck } from 'react-icons/fa6';
import { LuUsers2 } from 'react-icons/lu';


//product list
const productList = [
    {
        title: 'add-product',
        path: 'create-product',
        icon: <BsPlusSquare />
    },
    {
        title: 'Newsletter Email',
        path: 'newsletter',
        icon: <FaEnvelopeCircleCheck />
    },
    {
        title: 'SignIn users',
        path: 'users',
        icon: <LuUsers2 />
    },
    {
        title: 'Customers Order',
        path: 'order',
        icon: <HiShoppingBag />
    },
]

const SlideMenu = ({ openSlidebar }) => {
    const pathname = usePathname();
    return (
        <div className="product-menu">
            <div className="product-list ml-2">
                {
                    productList?.map((item, index) => {
                        const { title, path, icon } = item;
                        const newPath = `/home/${path}`;
                        return (
                            <div className="product">
                                <Link href={`/home/${path} `} key={index} className={`block my-2 px-2 capitalize rounded-md py-2  text-[15px] ${pathname === newPath ? "bg-blue-400 text-white" : 'text-gray-300'} `}>
                                    <div className="flex items-center gap-2">
                                        <span className='text-xl'>  {icon}</span>
                                        <span className={`${openSlidebar ? 'hidden' : 'block'}`}> {title}</span>
                                    </div>

                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default SlideMenu;