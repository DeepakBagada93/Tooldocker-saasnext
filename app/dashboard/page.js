'use client'; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import the Link component
import Sidebar from './components/Sidebar'; // Import the Sidebar component

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const router = useRouter();

  // Check if a user is logged in and approved
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUser(user);

        // Check if the user is approved
        const { data: userData, error } = await supabase
          .from('sn_users')
          .select('is_approved')
          .eq('email', user.email)
          .single();

        if (error) {
          console.error('Error fetching user approval status:', error.message);
        } else if (userData?.is_approved) {
          setIsApproved(true);
        } else {
          // Redirect to home page if the user is not approved
          router.push('/');
        }
      } else {
        // Redirect to home page if the user is not logged in
        router.push('/');
      }
    };

    fetchUser();
  }, [router]);

  if (!isApproved) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg">Your account is pending approval.</p>
        <Link href="/" className="mt-4 text-blue-600 hover:underline">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard!</h1>
        <p className="text-lg">You are logged in as: {user.email}</p>
      </div>
    </div>
  );
}