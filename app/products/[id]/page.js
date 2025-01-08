'use client'; // Mark this component as a client component

import React, { useEffect, useState } from 'react'; // Import React
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const id = React.use(params).id; // Unwrap params to get the id

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('sn_products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error.message);
      } else {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id]); // Use the unwrapped id in the dependency array

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl">
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Attributes</h2>
            {product.attributes &&
              Object.entries(product.attributes).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <strong>{key}:</strong> {value}
                </div>
              ))}
          </div>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}