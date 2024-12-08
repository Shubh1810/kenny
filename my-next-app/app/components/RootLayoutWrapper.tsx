'use client';

import { Providers } from './Providers';

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 