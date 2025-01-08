'use client'; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';

export default function ShowProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  // Fetch products from Supabase table
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('sn_products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error.message);
    } else {
      setProducts(data);
    }
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      const { error } = await supabase
        .from('sn_products')
        .delete()
        .eq('id', productId);

      if (error) {
        console.error('Error deleting product:', error.message);
      } else {
        // Refresh the products list
        fetchProducts();
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">Show Products</h1>
        <div className="w-full max-w-4xl">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">SKU</th>
                <th className="border border-gray-300 px-4 py-2">Stock</th>
                <th className="border border-gray-300 px-4 py-2">Categories</th>
                <th className="border border-gray-300 px-4 py-2">Tags</th>
                <th className="border border-gray-300 px-4 py-2">Attributes</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                  <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.sku}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.stock_quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.categories?.join(', ')}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.tags?.join(', ')}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.attributes &&
                      Object.entries(product.attributes).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value}
                        </div>
                      ))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 object-cover"
                      />
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}