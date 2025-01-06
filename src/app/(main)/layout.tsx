import HeaderLogged from '@/components/Header/HeaderLogged';
import Footer from '@/shared/Footer/Footer';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SessionProvider>
        <HeaderLogged />

        {children}
      </SessionProvider>
      <Footer />
    </div>
  );
}

export default MainLayout;
