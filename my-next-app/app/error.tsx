"use client";

import React from 'react';
import { Button } from './components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Something went wrong!</h1>
        <p className="text-white/70 mb-4">{error.message || 'An unexpected error occurred'}</p>
        <div className="space-x-4">
          <Button onClick={() => reset()}>
            Try again
          </Button>
          <Button variant="secondary" onClick={() => window.location.href = '/'}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
