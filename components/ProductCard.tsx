"use client";

import React from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
    description: string;
}

interface productProp {
    product: Product;
    onDelete: (id: string) => void
    onUpdate: (product: Product) => void
}

export default function ProductCard({ product, onDelete, onUpdate }: productProp) {
    const { id, name, price, stock, image, description } = product;

    return (
        <>
            <div className="m-6 w-72 h-100 rounded-2xl bg-white shadow-md hover:shadow-xl hover:scale-102  transition duration-300 overflow-hidden group flex flex-col">

                {/* Image */}
                <div className="overflow-hidden">
                    <img
                        className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                        src={image}
                        alt={name}
                    />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">

                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {description}
                    </p>

                    <p className="text-xl font-bold mt-3 text-black">
                        ${price}
                    </p>

                    {/* Stock */}
                    <p className={`text-sm mt-1 ${stock > 0 ? "text-green-600" : "text-red-500"}`}>
                        {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-auto">
                        <button onClick={() => onDelete(id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg py-1.5 transition">
                            Delete
                        </button>
                        <button onClick={() => onUpdate(product)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-1.5 transition">
                            Update
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}