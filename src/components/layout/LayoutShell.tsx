'use client';

import { ReactNode } from 'react';
import BottomNav from './BottomNav';
import Footer from './Footer';
import Header from './Header';
import PageTransition from './PageTransition';
import Sidebar from './Sidebar';

interface LayoutShellProps {
  children: ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <>
      <Header />
      <div className="container-shell flex gap-6 pt-20">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="min-w-0 flex-1 pb-20 lg:pb-0">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
}
