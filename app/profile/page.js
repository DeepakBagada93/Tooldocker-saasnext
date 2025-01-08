'use client'; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function Profile() {
  const [user, setUser] = useState(null);

  // Check if a user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg">Please log in to access the profile page.</p>
        <Link href="/" className="mt-4 text-blue-600 hover:underline">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <h1 className="text-4xl font-bold mb-4">Your Profile</h1>
      <div className="flex items-center space-x-4">
        <img
          src={user.user_metadata?.avatar_url || '/default-avatar.png'}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <p className="text-lg">Name: {user.user_metadata?.full_name || 'No name'}</p>
          <p className="text-lg">Email: {user.email}</p>
        </div>
      </div>
      <Link href="/" className="mt-4 text-blue-600 hover:underline">
        Go to Home
      </Link>
    </div>
  );
}