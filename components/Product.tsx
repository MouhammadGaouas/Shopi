import React from 'react'

export default function Product() {

    return (
        <div className='m-10 flex items-center justify-between w-1/2'>
            <div className='font-semibold'>
                <p>Iphone 17 pro</p>
            </div>

            <p>|</p>

            <div className='font-semibold'>
                <p>In Stock : 17</p>
            </div>

            <p>|</p>

            <button className='bg-red-500 text-white font-bold py-1 px-6'>Delete product </button>
        </div>
    )
}
