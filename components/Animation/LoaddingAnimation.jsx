"use client"
import React from 'react';
import { BeatLoader } from 'react-spinners';

const LoaddingAnimation = () => {
    return (
        <div className='my-24 px-5 lg:px-12'>
            <div className="loadding text-center">
                <BeatLoader
                    color="#06b6d4"
                    speedMultiplier={2}
                    size={30}
                />
                <p className='text-center text-slate-600 mt-2 text-xl'>Loadding please wait....</p>
            </div>
        </div>
    );
};

export default LoaddingAnimation;