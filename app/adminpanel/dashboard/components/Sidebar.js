'use client'; // Mark this component as a client component

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    // Clear admin credentials from localStorage
    localStorage.removeItem('admin-username');
    localStorage.removeItem('admin-password');

    // Redirect to home page
    router.push('/');
  };

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul>
        <li className="mb-4">
          <Link
            href="/adminpanel/dashboard"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/adminpanel/users"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Users
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/adminpanel/profile"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Admin Profile
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