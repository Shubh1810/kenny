'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
        <p className="text-white/70 mb-4">The page you're looking for doesn't exist</p>
        <Link 
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
} 