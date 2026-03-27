"use client";

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface CreateProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateProductForm({ onClose, onSuccess }: CreateProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    description: '',
    price: '',
    inStock: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      name: formData.name,
      image: formData.imageUrl,
      description: formData.description || undefined,
      price: parseFloat(formData.price),
      stock: parseInt(formData.inStock, 10),
    };

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create product');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div
        className="bg-[var(--card-background)] shadow-2xl my-auto rounded-2xl w-full max-w-lg overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-gray-100 border-b">
          <h2 className="flex items-center gap-2 font-semibold text-white text-white text-lg sm:text-xl">
            <Plus className="w-5 h-5 text-emerald-600" />
            Create New Product
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-full text-white transition-colors"
            type="button"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="bg-red-50 px-4 py-3 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block mb-1.5 font-medium text-white text-sm">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Wireless Headphones"
              className="px-4 py-2.5 border border-gray-200 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full text-white transition-all placeholder-gray-400"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-1.5 font-medium text-white text-sm">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
              className="px-4 py-2.5 border border-gray-200 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full text-white transition-all placeholder-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1.5 font-medium text-white text-sm">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Product description..."
              className="px-4 py-2.5 border border-gray-200 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full text-white transition-all resize-none placeholder-gray-400"
            />
          </div>

          {/* Price and Stock */}
          <div className="gap-4 grid grid-cols-2">
            <div>
              <label className="block mb-1.5 font-medium text-white text-sm">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                className="px-4 py-2.5 border border-gray-200 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full text-white transition-all placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block mb-1.5 font-medium text-white text-sm">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="inStock"
                value={formData.inStock}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
                className="px-4 py-2.5 border border-gray-200 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full text-white transition-all placeholder-gray-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-red-400/70 hover:bg-gray-50 disabled:opacity-50 px-4 py-2.5 border border-gray-200 rounded-xl font-medium text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 px-4 py-2.5 rounded-xl font-medium text-white transition-colors"
            >
              {loading ? (
                <>
                  <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
