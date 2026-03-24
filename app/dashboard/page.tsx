"use client";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Package, TrendingUp, DollarSign } from 'lucide-react';
import { useEffect, useState } from "react";
import CreateProductForm from "../../components/CreateProductForm";

export default function DashboardPage() {

  const { data: session, isPending } = useSession();
  const router = useRouter()
  


  useEffect(() => {
    console.log(session)
    if(!session || session.user.role !== "ADMIN") 
      router.push("/")

  }, [session, router, isPending])



  const [count, setCount] = useState<number>(0)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false)

  useEffect(() => {
    async function handleFetch() {
      const response = await fetch("/api/admin/dashboard")
      const data = await response.json()

      if (response.ok) {
        setLoading(false)

        setCount(data.count)
        setProducts(data.products)
        console.log(data)
      } else {
        setLoading(true)
      }

    }


    handleFetch()

  }, [])

  const handleProductCreated = () => {
    setLoading(true);
    async function handleFetch() {
      const response = await fetch("/api/admin/dashboard")
      const data = await response.json()

      if (response.ok) {
        setLoading(false)
        setCount(data.count)
        setProducts(data.products)
      } else {
        setLoading(true)
      }
    }
    handleFetch()
  }

  const stats = [
    {
      title: "Total Products",
      value: count,
      icon: Package,
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Low Stock",
      value: 0,
      icon: TrendingUp,
      color: "from-orange-500 to-amber-600"
    },
    {
      title: "Total Value",
      value: "$0",
      icon: DollarSign,
      color: "from-blue-500 to-indigo-600"
    }
  ];

  return (
    <main className="min-h-screen p-8 scroll-smooth ">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Overview of your inventory and products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-15 transition-opacity`} />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
                  {loading ? (
                    <div className="h-10 w-24 bg-white/10 rounded-lg animate-pulse" />
                  ) : (
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  )}
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
            >
              Add New Product
            </button>
            <button
              onClick={() => router.push("/dashboard/stock")}
              className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10"
            >
              View Inventory
            </button>
          </div>
        </div>
      </div>

      {showCreateForm && (
        <CreateProductForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={handleProductCreated}
        />
      )}
    </main>
  );
} 