import HeaderLogged from '@/components/Header/HeaderLogged';
import dynamic from 'next/dynamic';
// import Footer from '@/shared/Footer/Footer';
import { ReactNode } from 'react';
const Footer = dynamic(() => import('@/shared/Footer/Footer'), { ssr: false });
function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderLogged />

      {children}

      <Footer />
    </>
  );
}

export default MainLayout;
