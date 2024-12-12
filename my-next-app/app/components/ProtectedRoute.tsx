// ProtectedRoute component to protect routes
"use client";

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      console.log('No user found, redirecting to login');
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-pulse text-white/70">
          <div className="text-center">
            <div className="text-lg font-semibold">Loading...</div>
            <div className="text-sm text-white/50">Please wait</div>
          </div>
        </div>
      </div>
    );
  }

  // Add debug log
  console.log('Protected route render:', { user: !!user, isLoading });

  return <>{user ? children : null}</>;
} 