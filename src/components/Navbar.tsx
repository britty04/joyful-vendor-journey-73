
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, MapPin } from 'lucide-react';
import UserAuthNav from './UserAuthNav';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useState('New York');

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
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                    Home
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-primary">
                    Kids Events
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white p-4 rounded-lg shadow-lg border w-[300px]">
                    <div className="grid gap-3">
                      <Link 
                        to="/vendors?category=entertainers&event=kids" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Entertainment</div>
                        <div className="text-sm text-gray-500">Magicians, Clowns, Character Actors</div>
                      </Link>
                      <Link 
                        to="/vendors?category=decorators&event=kids" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Decoration</div>
                        <div className="text-sm text-gray-500">Balloons, Theme Decorations</div>
                      </Link>
                      <Link 
                        to="/vendors?category=catering&event=kids" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Catering</div>
                        <div className="text-sm text-gray-500">Kid-friendly Menus, Cakes, Treats</div>
                      </Link>
                      <Link 
                        to="/guided-booking?event=birthday" 
                        className="block p-2 text-primary hover:bg-primary/10 rounded-md"
                      >
                        <div className="font-medium">Start AI-Guided Booking</div>
                        <div className="text-sm">Let us recommend the perfect vendors</div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-primary">
                    Corporate Events
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white p-4 rounded-lg shadow-lg border w-[300px]">
                    <div className="grid gap-3">
                      <Link 
                        to="/vendors?category=venues&event=corporate" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Venues</div>
                        <div className="text-sm text-gray-500">Conference Centers, Meeting Rooms</div>
                      </Link>
                      <Link 
                        to="/vendors?category=catering&event=corporate" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Catering</div>
                        <div className="text-sm text-gray-500">Business Lunches, Cocktail Hours</div>
                      </Link>
                      <Link 
                        to="/vendors?category=technology&event=corporate" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Tech Services</div>
                        <div className="text-sm text-gray-500">AV Equipment, Presentation Support</div>
                      </Link>
                      <Link 
                        to="/guided-booking?event=corporate" 
                        className="block p-2 text-primary hover:bg-primary/10 rounded-md"
                      >
                        <div className="font-medium">Start AI-Guided Booking</div>
                        <div className="text-sm">Let us recommend the perfect vendors</div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-primary">
                    Weddings
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white p-4 rounded-lg shadow-lg border w-[300px]">
                    <div className="grid gap-3">
                      <Link 
                        to="/vendors?category=venues&event=wedding" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Venues</div>
                        <div className="text-sm text-gray-500">Banquet Halls, Gardens, Beaches</div>
                      </Link>
                      <Link 
                        to="/vendors?category=photographers&event=wedding" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Photography</div>
                        <div className="text-sm text-gray-500">Photographers, Videographers</div>
                      </Link>
                      <Link 
                        to="/vendors?category=decorators&event=wedding" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Decoration</div>
                        <div className="text-sm text-gray-500">Floral Arrangements, Lighting</div>
                      </Link>
                      <Link 
                        to="/guided-booking?event=wedding" 
                        className="block p-2 text-primary hover:bg-primary/10 rounded-md"
                      >
                        <div className="font-medium">Start AI-Guided Booking</div>
                        <div className="text-sm">Let us recommend the perfect vendors</div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/vendors" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                    All Vendors
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Location selector (desktop) */}
          <div className="hidden md:flex items-center mr-4">
            <MapPin size={16} className="text-gray-500 mr-1" />
            <select 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className="text-sm font-medium text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer"
            >
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="Miami">Miami</option>
              <option value="Dallas">Dallas</option>
            </select>
          </div>

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
            
            {/* Location selector (mobile) */}
            <div className="flex items-center px-3 py-2">
              <MapPin size={16} className="text-gray-500 mr-2" />
              <select 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="text-sm font-medium text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 w-full"
              >
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Chicago">Chicago</option>
                <option value="Miami">Miami</option>
                <option value="Dallas">Dallas</option>
              </select>
            </div>
            
            {/* Category links for mobile */}
            <div className="border-t border-gray-100 pt-2 mt-2">
              <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Kids Events</div>
              <Link 
                to="/vendors?category=entertainers&event=kids" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Entertainment
              </Link>
              <Link 
                to="/vendors?category=decorators&event=kids" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Decoration
              </Link>
              <Link 
                to="/vendors?category=catering&event=kids" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Catering
              </Link>
            </div>
            
            <div className="border-t border-gray-100 pt-2 mt-2">
              <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Corporate Events</div>
              <Link 
                to="/vendors?category=venues&event=corporate" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Venues
              </Link>
              <Link 
                to="/vendors?category=catering&event=corporate" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Catering
              </Link>
              <Link 
                to="/vendors?category=technology&event=corporate" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tech Services
              </Link>
            </div>
            
            <div className="border-t border-gray-100 pt-2 mt-2">
              <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Weddings</div>
              <Link 
                to="/vendors?category=venues&event=wedding" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Venues
              </Link>
              <Link 
                to="/vendors?category=photographers&event=wedding" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Photography
              </Link>
              <Link 
                to="/vendors?category=decorators&event=wedding" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Decoration
              </Link>
            </div>
            
            <div className="border-t border-gray-100 pt-2 mt-2">
              <Link 
                to="/vendors" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Vendors
              </Link>
              <Link 
                to="/guided-booking" 
                className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI-Guided Booking
              </Link>
              <Link 
                to="/auth" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login / Sign Up
              </Link>
            </div>
            
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
