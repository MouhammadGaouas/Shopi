"use client";
import { useRouter } from "next/navigation";
import { Warehouse } from 'lucide-react';
import { use, useEffect, useState } from "react";


export default function DashboardPage() {

  const [count, setCount] = useState<number>(0)
  const [products , setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function handleFetch() {
      const response = await fetch("/api/admin/dashboard")
      const data = await response.json()

      if (response.ok) {
        setLoading(false)

        setCount(data.count)
        console.log(data)
      } else {
        setLoading(true)
      }

    }


    handleFetch()

  },[])


  const router = useRouter();

  return (
    <main className="h-screen px-8 ">
      <div className="mt-4 p-8 bg-white/5 backdrop-blur-lg border border-white/10">
        <h1 className="text-white text-3xl">Dashboard</h1>
        <div className="bg-black/5 backdrop-blur-lg border  border-white/10 p-8 flex items-center rounded-xl justify-between w-1/2 gap-8 m-8 ">

          <div className="text-white flex items-center flex-col">
            <Warehouse size={42} />
            <p className="text-2xl font-semibold">In Stock</p>
            {
              loading ? <img className="w-8" src="/180-ring-with-bg.svg" alt="" /> : <p className="text-3xl font-semibold">{count}</p>
            }
          </div>

          <div className="text-white flex items-center flex-col">
            <Warehouse size={42} />
            <p className="text-2xl font-semibold">In Stock</p>
            {
              loading ? <img className="w-8" src="/180-ring-with-bg.svg" alt="" /> : <p className="text-3xl font-semibold">{count}</p>
            }
          </div>

          <div className="text-white flex items-center flex-col">
            <Warehouse size={42} />
            <p className="text-2xl font-semibold">In Stock</p>
            {
              loading ? <img className="w-8" src="/180-ring-with-bg.svg" alt="" /> : <p className="text-3xl font-semibold">{count}</p>
            }
          </div>
        </div>


      </div>
    </main>
  );
} 