'use client';

import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import PageTransition from './PageTransition';

interface LayoutShellProps {
  children: ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <>
      <Header />
      <main className="pt-16">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
