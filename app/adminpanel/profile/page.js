'use client'; // Mark this component as a client component

import { useRouter } from 'next/navigation';
import Sidebar from '../dashboard/components/Sidebar';

export default function AdminProfile() {
  const router = useRouter();

  // Check admin authentication
  useEffect(() => {
    const checkAuth = () => {
      const username = localStorage.getItem('admin-username');
      const password = localStorage.getItem('admin-password');

      if (username !== 'Tooldocker' || password !== 'tooldocker@junaid') {
        router.push('/adminpanel');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">Admin Profile</h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <p className="text-lg">Username: <span className="font-semibold">Tooldocker</span></p>
          <p className="text-lg">Role: <span className="font-semibold">Admin</span></p>
        </div>
      </div>
    </div>
  );
}