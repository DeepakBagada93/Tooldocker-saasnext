'use client'; // Mark this component as a client component

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  // Calculate the total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-700">${item.price} x {item.quantity}</p>
                </div>
              </div>
              <p className="text-xl font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={clearCart}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Place Order
          </button>
          <Link
            href="/"
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 block text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}