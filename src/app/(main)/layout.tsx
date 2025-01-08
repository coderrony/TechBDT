import HeaderLogged from '@/components/Header/HeaderLogged';
import Footer from '@/shared/Footer/Footer';
import { ReactNode } from 'react';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <HeaderLogged />

      {children}

      <Footer />
    </div>
  );
}

export default MainLayout;
