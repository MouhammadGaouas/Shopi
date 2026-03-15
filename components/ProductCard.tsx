import React from "react";

export default function ProductCard () {
    return (
        <div className="m-6 w-72 overflow-hidden rounded-2xl">
            <div className="w-full bg-white/20 overflow-hidden">
                <img className="w-full h full object-cover hover:scale-110 duration-300" src="https://hammeronline.in/cdn/shop/files/Hammerglidebluetoothcallingsmartwatch_1.webp?v=1694851875" alt="" />
            </div>
            <div className="bg-gray-300/50 p-4">
                <p className="text-lg font-semibold text-center">Hammer Glide Smart Watch</p>
                <p className="text-xl font-semibold text-center mt-2">price : 210$</p>
                <div className="flex items-center justify-between gap-2 mt-4">
                    <button className="bg-red-500 text-white text-lg rounded-lg px-2 text-medium flex-1 py-1">Delete </button>
                    <button className="bg-green-500 text-white text-lg rounded-lg px-2 text-medium flex-1 py-1">Update</button>
                </div>
            </div>
        </div>
    )
}