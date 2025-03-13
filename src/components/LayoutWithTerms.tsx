
import React from 'react';
import Navbar from './Navbar';
import FooterWithTerms from './FooterWithTerms';

interface LayoutWithTermsProps {
  children: React.ReactNode;
}

const LayoutWithTerms: React.FC<LayoutWithTermsProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <FooterWithTerms />
    </div>
  );
};

export default LayoutWithTerms;
