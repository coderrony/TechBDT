

import { ProductCacheProvider } from '@/provider/ProductCacheProvider';
import dynamic from 'next/dynamic';
// import Footer from '@/shared/Footer/Footer';
import { ReactNode } from 'react';
const Footer = dynamic(() => import('@/shared/Footer/Footer'), { ssr: false });
const HeaderLogged = dynamic(() => import('@/components/Header/HeaderLogged'), { ssr: false });
// const Footer = dynamic(() => import('@/shared/Footer/Footer'));
// const HeaderLogged = dynamic(() => import('@/components/Header/HeaderLogged'));
function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderLogged />

      <ProductCacheProvider>

      {children}
      </ProductCacheProvider>

   

      <Footer />
    </>
  );
}

export default MainLayout;
