"use client"

import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import UpdateProductForm from '@/components/UpdateProductForm'

interface Product {
  id: string
  name: string
  price: number
  stock: number
  image: string
  description: string
}

export default function Stock() {
  const [products, setProducts] = useState<Product[]>([])
  const [onUpdateProduct, setOnUpadateProduct] = useState<Product | null>(null)

  useEffect(() => {
    handleFetchProducts()
  }, [])

  async function handleFetchProducts() {
    try {
      const response = await fetch("/api/admin/products/stock")
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/admin/products/${id}`,
        { method: "DELETE" }
      )

      if (res.ok) {
        setProducts(prev => products.filter((e) => e.id !== id))

      }
    } catch (error) {
      console.error("ERROR:", error)
    }

  }


  function handleUpdate(product: Product) {
    setOnUpadateProduct(product)
  }



  return (
    <div className="flex items-center justify-center">

      {
        onUpdateProduct &&
        <div>
          <UpdateProductForm onSuccess={handleFetchProducts} onClose={() => setOnUpadateProduct(null)} product={onUpdateProduct} />
        </div>
      }
      {
        products.length === 0 ? (
          <div className="text-white text-center text-3xl mt-8">
            The Stock is Empty
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                product={product} />
            ))}
          </div>
        )
      }
    </div>
  )
}
