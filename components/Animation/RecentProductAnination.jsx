"use client"
import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const RecentProductAnination = () => {
    return (
        <div className="ss">
            <div className="item">
                <Skeleton count={1} height={400} highlightColor='#34495e' baseColor='#e5e7eb' />
            </div>
        </div>
    );
};

export default RecentProductAnination;