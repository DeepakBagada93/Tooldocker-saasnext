'use client'; // Mark this component as a client component

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  // Handle logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link
            href="/dashboard"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/dashboard/add-product"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Add Product
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/dashboard/show-products"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Show Products
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-4 hover:bg-gray-700 rounded"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}