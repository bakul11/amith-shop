"use client"
import SlideBar from '@/components/SlideBar/SlideBar';
import React from 'react';


const layout = ({ children }) => {
    return (
        <div className='flex flex-row min-h-screen w-full justify-between'>
            <div className="slidebar">
                <SlideBar />
            </div>
            <div className="children overflow-hidden w-full px-12">
                {children}
            </div>
        </div>
    );
};

export default layout;