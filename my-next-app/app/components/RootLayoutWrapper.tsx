'use client';

import { Providers } from './Providers';
import { usePathname } from 'next/navigation';

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't wrap error pages with providers
  if (pathname === '/error' || pathname === '/not-found') {
    return <>{children}</>;
  }

  return <Providers>{children}</Providers>;
} 