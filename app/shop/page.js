'use client'; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; // Import useCart

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Use the addToCart function from the Cart Context

  // Fetch products from Supabase table
  useEffect(() => {
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

    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-4">${product.price}</p>
              <div className="flex space-x-2">
                <Link
                  href={`/products/${product.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Details
                </Link>
                <button
                  onClick={() => addToCart(product)} // Add product to cart
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}