'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import * as fbPixel from '@/lib/fbpixel';

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    fbPixel.pageview();
  }, [pathname]);

  return <>{children}</>;
}
