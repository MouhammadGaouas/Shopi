"use client"
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { useSession, signOut } from "@/lib/auth-client"

const Navigation = () => {

  const { data: session, isPending } = useSession()
  const router = useRouter();



  useEffect(() => {

    if (!isPending && !session?.user) {
      router.push("/sign-in")
    }

  }, [isPending, session, router])



  return (
    <div className='sticky top-0 z-1000 px-6 py-4 w-full flex items-center justify-between backdrop-blur-xs bg-gray-900  shadow-md'>
      <div className='flex items-center justify-between gap-30 w-1/4'>
        <h1 className='text-2xl text-white font-semibold'>Shopi</h1>
        <ul className='flex items-center justify-between w-full gap-10'>
          <li onClick={() => router.push("/")} className='text-white text-lg cursor-default'>Home</li>
          <li onClick={()=> router.push("/dashboard")} className='text-white text-lg cursor-default'>Dashboard</li>
        </ul>
      </div>


      {
        (!session?.user && !isPending) ? (

          <div className="flex items-center gap-8 " >
            <button onClick={() => router.push("/sign-up")} className='text-sm text-white font-semibold bg-blue-600 py-2 w-30 rounded-lg'>Get Started</button>
            <button onClick={() => router.push("/sign-in")} className='text-sm text-white font-semibold bg-blue-600 py-2 w-30 rounded-lg'>Login</button>
          </div>

        ) : (

          <button onClick={() => signOut()} className="text-sm text-white font-semibold bg-red-600 py-2 w-30 rounded-lg">Sign Out</button>

        )
      }
    </div>
  )
}

export default Navigation
