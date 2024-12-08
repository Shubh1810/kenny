'use client';

import { Providers } from './Providers';

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
} 