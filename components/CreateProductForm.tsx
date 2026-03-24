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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden my-auto"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-600" />
            Create New Product
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            type="button"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Wireless Headphones"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Product description..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 resize-none"
            />
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
