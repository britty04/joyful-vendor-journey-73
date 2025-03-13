
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import UserAuthNav from './UserAuthNav';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-eventBlue-600 to-eventPurple-600 bg-clip-text text-transparent">
              EventHive
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/vendors" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Vendors
            </Link>
            <Link to="/categories" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="rounded-full p-2 text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors">
              <Search size={20} />
            </button>
            <UserAuthNav />
            <button className="rounded-full bg-primary text-white px-4 py-2 font-medium transition-all hover:bg-primary/90 active:scale-95">
              Become a Vendor
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden rounded-full p-2 text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/vendors" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Vendors
            </Link>
            <Link 
              to="/categories" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/auth" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login / Sign Up
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <button className="w-full rounded-full bg-primary text-white px-4 py-2 font-medium transition-all hover:bg-primary/90 active:scale-95">
                Become a Vendor
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
