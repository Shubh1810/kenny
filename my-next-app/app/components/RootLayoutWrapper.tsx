'use client';

import { Providers } from './Providers';
import { usePathname } from 'next/navigation';

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  
    const pathname = usePathname();
  
  // Don't wrap error pages or static pages with providers
  if (pathname === '/error' || pathname === '/not-found' || pathname === '/500' || pathname === '/_error') {
    return <>{children}</>;
  }

  return <Providers>{children}</Providers>;
} 