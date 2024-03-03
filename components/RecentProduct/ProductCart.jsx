"use clinet"
import Image from 'next/image';
import React from 'react';
import { FaEye } from 'react-icons/fa';
import { LuTrash2 } from "react-icons/lu";
import { AiOutlineEdit } from "react-icons/ai";
import Link from 'next/link';
import toast from 'react-hot-toast';

const ProductCart = ({ product, index }) => {
    const { title, photo, newPrice, oldPrice, _id } = product;

    const handleRemoveProduct = async (id) => {
        const confirmRemove = window.confirm('Do you want delete this item?');

        if (confirmRemove) {
            fetch(`/api/product/remove/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(result => {
                    if (result?.success) {
                        toast.success(result?.message)
                    } else {
                        if (result?.error) {
                            toast.error(result?.message)
                        }
                    }
                })
        }
    }



    return (
        <tr className='text-[14px] text-[#637381] font-[500] capitalize' key={index}>
            <td className='border-blue-100 border-b-[1px] p-2'>{index + 1}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>
                <Image src={photo} alt='photo' height={100} width={100} className='object-cover rounded-sm h-[40px] w-[40px]' />
            </td>
            <td className='border-blue-100 border-b-[1px] p-2'> {title}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>
                <h4 className='text-rose-500 font-semibold'>$ {newPrice}.00 <span className='text-slate-800'><del>$ {oldPrice}.00</del></span></h4>
            </td>

            <td className='border-blue-100 border-b-[1px] p-2'>
                <LuTrash2 className='cursor-pointer text-red-500' onClick={() => handleRemoveProduct(_id)} />
            </td>
        </tr>
    );
};

export default ProductCart;