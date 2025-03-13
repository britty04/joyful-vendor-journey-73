
import React from 'react';
import Navbar from './Navbar';
import FooterSection from './FooterSection';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <FooterSection />
    </div>
  );
};

export default Layout;
