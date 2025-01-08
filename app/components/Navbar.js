'use client'; // Mark this component as a client component

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useCart } from '@/context/CartContext'; // Import useCart

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const { cart } = useCart(); // Use the cart state from the Cart Context

  // Handle Google login
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error logging in:', error.message);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      setUser(null);
    }
  };

  // Check if a user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-lg font-semibold text-black">
            ToolDocker
          </div>
          <div className="flex space-x-4">
            <Link
              href="/"
              className={`text-black hover:text-blue-600 ${pathname === '/' ? 'text-blue-600' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`text-black hover:text-blue-600 ${pathname === '/shop' ? 'text-blue-600' : ''}`}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={`text-black hover:text-blue-600 ${pathname === '/about' ? 'text-blue-600' : ''}`}
            >
              About
            </Link>
            {user ? (
              <Link
                href="/dashboard"
                className={`text-black hover:text-blue-600 ${pathname === '/dashboard' ? 'text-blue-600' : ''}`}
              >
                Dashboard
              </Link>
            ) : null}
          </div>
          <div className="flex items-center space-x-4">
            {/* Cart Icon with Badge */}
            <Link href="/cart" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black hover:text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {cart.length}
                </span>
              )}
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}