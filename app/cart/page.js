'use client'; // Mark this component as a client component

import { useCart } from '@/context/CartContext'; // Import useCart
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter(); // Initialize the router

  // Calculate the total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle product removal and redirect to home page
  const handleRemove = (productId) => {
    removeFromCart(productId); // Remove the product from the cart
    router.push('/'); // Redirect to the home page
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-6">
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
                    <p className="text-gray-700">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 px-2 py-1 border border-gray-300 rounded"
                    min="1"
                  />
                  <button
                    onClick={() => handleRemove(item.id)} // Use handleRemove function
                    className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
            <Link
              href="/checkout"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 block text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}