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
    <div className="p-6 min-h-screen">

      <h1 className='font-semibold text-white text-2xl'>| <span className='ml-6'>Home</span></h1>

      <div className='grid grid-cols-4 mt-6'>
        {
          products.map((val , key) => {
            return <Product key={key} {...val} />
          })
        }
      </div>
    </div>
  );
}
