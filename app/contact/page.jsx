"use client"
import useActiveUser from '@/hooks/useActiveUser';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';


const page = () => {
    const [user] = useActiveUser();

    


    return (
        <div className="line">
            {
                user?.email ?
                    <h2>welcome</h2>
                    : redirect('/login')
            }
        </div>
    )

};

export default page; 