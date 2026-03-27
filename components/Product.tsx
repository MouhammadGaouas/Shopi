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
        <div className='bg-[var(--card-background)] shadow-[var(--main-shadow)] p-4 rounded-xl w-90'>
            <div className='relative rounded-xl h-70 overflow-hidden'>
                <img className='w-full h-full object-cover' src={image} alt="" />
            </div>
            <div className='mt-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-semibold text-white text-lg'>{name}</h1>
                    <p className='font-semibold text-yellow-500 text-2xl'>${price}</p>
                </div>
                <div className='mt-2'>
                    <p className='text-white'>in Stock : {stock}</p>
                </div>
                <div className='flex justify-between items-center gap-6 mt-4'>
                    <button className='flex-1 bg-black px-6 py-1 rounded-sm text-white text-lg'>add to Cart</button>
                    <button className='flex-1 bg-black px-6 py-1 rounded-sm text-white text-lg'>Buy Now</button>
                </div>
            </div>
        </div>
    )
}
