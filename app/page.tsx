"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Product from '@/components/Product';
import { map } from 'better-auth';

interface Product {
  id: string
  name: string
  price: number
  stock: number
  image: string
  description: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  const router = useRouter();

  async function HandleFetchProducts() {
    try {
      const response = await fetch("/api/customer/products")
      const data = await response.json()
      console.log(data)
      setProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    HandleFetchProducts();
  },[])


  return (
    <div className="min-h-screen p-6">

      <h1 className='text-white text-2xl font-semibold'>| <span className='ml-6'>Home</span></h1>

      <div className='mt-6 grid grid-cols-4'>
        {
          products.map((val , key) => {
            return <Product key={key} {...val} />
          })
        }
      </div>
    </div>
  );
}
