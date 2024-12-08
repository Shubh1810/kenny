'use client';

import { Providers } from './Providers';
import { usePathname } from 'next/navigation';

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Return children directly for error pages
  if (pathname?.includes('error') || pathname?.includes('404') || pathname?.includes('500')) {
    return children;
  }

  return <Providers>{children}</Providers>;
} 