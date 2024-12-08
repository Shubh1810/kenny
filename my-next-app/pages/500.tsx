import React from 'react';
import { Button } from '../app/components/ui/button';

export default function Custom500() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">500 - Server Error</h1>
        <p className="text-white/70 mb-4">An unexpected error occurred on our servers</p>
        <Button onClick={() => window.location.href = '/'}>
          Go Home
        </Button>
      </div>
    </div>
  );
} 