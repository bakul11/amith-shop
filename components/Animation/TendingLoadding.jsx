"use client"
import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TendingLoadding = () => {
    return (
        <div className="ss">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
                <div className="item">
                    <Skeleton count={1} height={200} highlightColor='#34495e' baseColor='#e5e7eb' />
                </div>
                <div className="item">
                    <Skeleton count={1} height={200} highlightColor='#34495e' baseColor='#e5e7eb' />
                </div>
                <div className="item">
                    <Skeleton count={1} height={200} highlightColor='#34495e' baseColor='#e5e7eb' />
                </div>
                <div className="item">
                    <Skeleton count={1} height={200} highlightColor='#34495e' baseColor='#e5e7eb' />
                </div>
            </div>
        </div>
    );
};

export default TendingLoadding;