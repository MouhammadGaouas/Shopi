"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from "@/lib/auth-client";
import { LogOut, ShoppingBag } from 'lucide-react';


const Navigation = () => {



  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  return (
    <nav className='top-0 z-50 sticky bg-[var(--color-secondary)]/80 shadow-lg backdrop-blur-lg border-white/10 border-b w-full'>
      <div className='flex justify-between items-center mx-auto px-6 py-4 max-w-7xl'>
        <div className='flex items-center gap-12'>
          <button
            onClick={() => router.push("/")}
            className='group flex items-center gap-2.5'
          >
            <div className='flex justify-center items-center bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg group-hover:shadow-emerald-500/25 rounded-xl w-10 h-10 transition-shadow'>
              <ShoppingBag className='w-6 h-6 text-white' />
            </div>
            <span className='font-bold text-white text-2xl'>Shopi</span>
          </button>

          <ul className='flex items-center gap-2'>
            <li>
              <button
                onClick={() => router.push("/")}
                className='hover:bg-white/10 px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-white transition-all duration-200'
              >
                Home
              </button>
            </li>
            <li>
              {
                session?.user?.role === "ADMIN" ?
                  <button
                    onClick={() => router.push("/dashboard")}
                    className='hover:bg-white/10 px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-white transition-all duration-200'
                  >
                    Dashboard
                  </button>  : null
              }
            </li>
          </ul>
        </div>

        <div className='flex items-center gap-3'>
          {!session?.user && !isPending ? (
            <>
              <button
                onClick={() => router.push("/sign-up")}
                className='bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-teal-600 hover:to-teal-700 shadow-lg hover:shadow-emerald-500/25 px-5 py-2.5 rounded-xl font-semibold text-white transition-all duration-300'
              >
                Get Started
              </button>
            </>
          ) : (

            <button
              onClick={() => signOut()}
              className='hidden md:flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 px-5 py-2.5 border border-red-500/20 rounded-xl font-medium text-red-400 transition-all duration-200'
            >
              <LogOut className='w-4 h-4' />
              Sign Out
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navigation;
