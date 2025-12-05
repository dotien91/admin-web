'use client';

import { ItemsProvider } from '@/lib/items-context';

export default function CompositionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ItemsProvider>
      {children}
    </ItemsProvider>
  );
}

