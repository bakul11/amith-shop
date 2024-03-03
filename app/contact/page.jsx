"use client"
import React from 'react';

const page = () => {

    const handleSubmit = () => {

    }

    return (
        <div className='p-12 my-24'>
            <h2 className='mb-5'>upload zip file</h2>
            <input type="file" className='ring-1' />
            <button onClick={handleSubmit}>Upload submit</button>
        </div>
    );
};

export default page;