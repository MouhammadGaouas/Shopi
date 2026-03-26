"use client"
import React, { use } from 'react'

interface Product {
    id: string
    name: string
    price: number
    stock: number
    image: string
}


export default function Product({ id, name, price, stock, image}: Product) {
    return (
        <div className=' bg-white shadow[var(--main-shadow)] w-90 rounded-xl p-4'>
            <div className='rounded-xl overflow-hidden relative'>
                <img className='h-full w-full object-cover' src={image} alt="" />
            </div>
            <div className='mt-4'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold text-lg'>{name}</h1>
                    <p className='text-2xl text-yellow-500 font-semibold'>${price}</p>
                </div>
                <div className='mt-2'>
                    <p>in Stock : {stock}</p>
                </div>
                <div className='mt-4 flex items-center justify-between gap-6 '>
                    <button className='text-white text-lg bg-black px-6 py-1 flex-1 rounded-sm'>add to Cart</button>
                    <button className='text-white text-lg bg-black px-6 py-1 flex-1 rounded-sm'>Buy Now</button>
                </div>
            </div>
        </div>
    )
}
