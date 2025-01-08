'use client'; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Sidebar from './components/Sidebar';

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const router = useRouter();

  // Check admin authentication
  useEffect(() => {
    const checkAuth = () => {
      const username = localStorage.getItem('admin-username');
      const password = localStorage.getItem('admin-password');

      if (username !== 'Tooldocker' || password !== 'tooldocker@junaid') {
        // Redirect to login page if credentials are invalid
        router.push('/adminpanel');
      }
    };

    checkAuth();
  }, [router]);

  // Fetch data from Supabase table
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('sn_admin_data')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        setData(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <div className="w-full max-w-4xl">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(item.created_at).toLocaleString()}
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