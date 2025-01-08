'use client'; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Sidebar from '../dashboard/components/Sidebar';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
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

  // Fetch users from Supabase table
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('sn_users')
        .select('*');

      if (error) {
        console.error('Error fetching users:', error.message);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  // Handle user approval
  const handleApprove = async (userId) => {
    const { error } = await supabase
      .from('sn_users')
      .update({ is_approved: true })
      .eq('id', userId);

    if (error) {
      console.error('Error approving user:', error.message);
    } else {
      // Refresh the users list
      const { data } = await supabase
        .from('sn_users')
        .select('*');
      setUsers(data);
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">Users</h1>
        <div className="w-full max-w-4xl">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Avatar</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={user.avatar_url}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.is_approved ? (
                      <span className="text-green-600">Approved</span>
                    ) : (
                      <span className="text-red-600">Pending</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {!user.is_approved && (
                      <button
                        onClick={() => handleApprove(user.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Approve
                      </button>
                    )}
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