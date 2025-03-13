
import { ReactNode } from 'react';
import Navbar from './Navbar';
import FooterSection from './FooterSection';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-eventPurple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-eventPink-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-eventYellow-200 rounded-full opacity-10 blur-3xl"></div>
        
        {/* Confetti-like dots */}
        <div className="absolute h-full w-full opacity-30">
          <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-eventPink-400 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-eventPurple-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-eventBlue-400 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-eventGreen-400 rounded-full animate-float" style={{ animationDelay: '0.7s' }}></div>
          <div className="absolute bottom-1/3 right-1/5 w-3 h-3 bg-eventYellow-400 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
      
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 relative z-10">
        {children}
      </main>
      <FooterSection />
    </div>
  );
};

export default Layout;
