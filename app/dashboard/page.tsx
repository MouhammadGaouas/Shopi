"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "../../lib/auth-client";
import { useEffect, useState } from "react";
import {
  Package,
  Tag,
  Eye,
  Plus,
  LogOut,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  DollarSign,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  BarChart3,
  Settings,
  Home,
  Box,
  FileText,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [stats, setStats] = useState({
    inStock: 0,
    forSell: 0,
    totalProducts: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session?.user) {
      fetchStats();
    }
  }, [session]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      if (res.ok) {
        const products = await res.json();
        const inStock = products.filter((p: any) => p.stock > 0).length;
        const forSell = products.filter((p: any) => p.stock === 0).length;
        setStats({
          inStock,
          forSell,
          totalProducts: products.length,
          totalOrders: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
      </div>
    );
  }

  const { user } = session;

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Box, label: "Products", href: "/dashboard/products" },
    { icon: ShoppingCart, label: "Orders", href: "/dashboard/orders" },
    { icon: Users, label: "Customers", href: "/dashboard/customers" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: FileText, label: "Reports", href: "/dashboard/reports" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    color,
    loading,
  }: any) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          {loading ? (
            <div className="mt-2 h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {value}
            </p>
          )}
          {trend && (
            <div className="flex items-center mt-3">
              {trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ml-1 ${
                  trend === "up"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {trendValue}%
              </span>
              <span className="text-gray-400 text-sm ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({
    icon: Icon,
    label,
    onClick,
    color,
  }: any) => (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200"
    >
      <div
        className={`p-4 rounded-full ${color} group-hover:scale-110 transition-transform duration-200`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <span className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
        {label}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Shopi Admin
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
                {item.active && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-2 px-4 py-2 mt-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 w-48"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back, {user.name || "Admin"}! Here's what's happening
              today.
            </p>
          </div>

          {/* Stats Grid */}
          <section className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <StatCard
                title="Products in Stock"
                value={stats.inStock}
                icon={Package}
                trend="up"
                trendValue="12.5"
                color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                loading={loading}
              />
              <StatCard
                title="Products for Sell"
                value={stats.forSell}
                icon={Tag}
                trend="down"
                trendValue="3.2"
                color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                loading={loading}
              />
              <StatCard
                title="Total Products"
                value={stats.totalProducts}
                icon={Box}
                trend="up"
                trendValue="8.1"
                color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                loading={loading}
              />
              <StatCard
                title="Total Orders"
                value={stats.totalOrders}
                icon={ShoppingCart}
                trend="up"
                trendValue="24.3"
                color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                loading={loading}
              />
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <QuickActionCard
                icon={Plus}
                label="Add Product for Sell"
                onClick={() =>
                  router.push("/dashboard/products/create?type=sell")
                }
                color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              />
              <QuickActionCard
                icon={Package}
                label="Add Product in Stock"
                onClick={() =>
                  router.push("/dashboard/products/create?type=stock")
                }
                color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
              />
              <QuickActionCard
                icon={Eye}
                label="View Stock"
                onClick={() => router.push("/dashboard/stock")}
                color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              />
              <QuickActionCard
                icon={BarChart3}
                label="View Analytics"
                onClick={() => router.push("/dashboard/analytics")}
                color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
              />
            </div>
          </section>

          {/* Recent Activity / Info Cards */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Getting Started */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">
                Get Started with Shopi
              </h3>
              <p className="text-blue-100 text-sm mb-4">
                Set up your store by adding products, configuring payments, and
                customizing your storefront.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Package className="w-3 h-3" />
                  </div>
                  <span className="text-sm">Add your first product</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <DollarSign className="w-3 h-3" />
                  </div>
                  <span className="text-sm">Configure payment methods</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <ShoppingCart className="w-3 h-3" />
                  </div>
                  <span className="text-sm">Set up shipping options</span>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                Start Setup
              </button>
            </div>

            {/* Tips Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Quick Tips
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Keep product stock updated to avoid overselling
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Check analytics regularly to track sales performance
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Respond to customer inquiries within 24 hours
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Review orders daily to ensure timely fulfillment
                  </p>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
