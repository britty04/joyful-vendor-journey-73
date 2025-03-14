
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, MapPin, HelpCircle } from 'lucide-react';
import UserAuthNav from './UserAuthNav';
import CartIcon from './cart/CartIcon';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
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
  const [location, setLocation] = useState(() => {
    return localStorage.getItem('selectedCity') || 'Mumbai';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCity', location);
  }, [location]);

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
          {/* Logo and Become Vendor Button (Desktop) */}
          <div className="flex items-center gap-4">
            <Logo size="md" />
            <Link 
              to="/vendor/onboarding" 
              className="hidden md:block"
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/80 hover:bg-white border-eventPurple-300 text-eventPurple-700 hover:text-eventPurple-900 hover:border-eventPurple-500 transition-all"
              >
                Become a Vendor
              </Button>
            </Link>
          </div>

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
                    Wedding Events
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white p-4 rounded-lg shadow-lg border w-[300px]">
                    <div className="grid gap-3">
                      <Link 
                        to="/vendors?category=venues&event=wedding" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Venues</div>
                        <div className="text-sm text-gray-500">Banquet Halls, Farmhouses, Destination</div>
                      </Link>
                      <Link 
                        to="/vendors?category=photographers&event=wedding" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Photography</div>
                        <div className="text-sm text-gray-500">Photographers, Videographers, Drone</div>
                      </Link>
                      <Link 
                        to="/vendors?category=decorators&event=wedding" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Decoration</div>
                        <div className="text-sm text-gray-500">Floral, Lighting, Mandap Design</div>
                      </Link>
                      <Link 
                        to="/vendors?category=makeup&event=wedding" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Bridal Makeup</div>
                        <div className="text-sm text-gray-500">Makeup Artists, Mehndi, Hair Styling</div>
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
                        <div className="text-sm text-gray-500">Conference Centers, Hotel Ballrooms</div>
                      </Link>
                      <Link 
                        to="/vendors?category=catering&event=corporate" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Catering</div>
                        <div className="text-sm text-gray-500">Corporate Lunches, Cocktail Hours</div>
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
                    Ticketed Events
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white p-4 rounded-lg shadow-lg border w-[300px]">
                    <div className="grid gap-3">
                      <Link 
                        to="/tickets?category=concerts" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Concerts</div>
                        <div className="text-sm text-gray-500">Live Music, Bands, Festivals</div>
                      </Link>
                      <Link 
                        to="/tickets?category=shows" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Shows & Performances</div>
                        <div className="text-sm text-gray-500">Standup Comedy, Theatre</div>
                      </Link>
                      <Link 
                        to="/tickets?category=workshops" 
                        className="block p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">Workshops</div>
                        <div className="text-sm text-gray-500">Culinary, Art, Professional</div>
                      </Link>
                      <Link 
                        to="/ticketing-events" 
                        className="block p-2 text-primary hover:bg-primary/10 rounded-md"
                      >
                        <div className="font-medium">All Ticketed Events</div>
                        <div className="text-sm">Browse all upcoming events</div>
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
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi NCR</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
              <option value="Jaipur">Jaipur</option>
            </select>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="rounded-full p-2 text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors">
              <Search size={20} />
            </button>
            <CartIcon />
            <Link 
              to="/support/tickets" 
              className="text-gray-500 hover:text-primary transition-colors" 
              title="Support"
            >
              <HelpCircle className="h-5 w-5" />
            </Link>
            <UserAuthNav />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <CartIcon />
            <button 
              className="rounded-full p-2 text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Pune">Pune</option>
                <option value="Jaipur">Jaipur</option>
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
              <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Wedding Events</div>
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
                to="/vendors?category=makeup&event=wedding" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bridal Makeup
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
              <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Ticketed Events</div>
              <Link 
                to="/tickets?category=concerts" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Concerts
              </Link>
              <Link 
                to="/tickets?category=shows" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shows
              </Link>
              <Link 
                to="/tickets?category=workshops" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors pl-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Workshops
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
                to="/support/tickets" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Support
                </div>
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
              <Link 
                to="/vendor/onboarding"
                className="w-full block text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button 
                  className="w-full bg-gradient-to-r from-eventBlue-600 to-eventPurple-600 text-white hover:from-eventBlue-700 hover:to-eventPurple-700"
                >
                  Become a Vendor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
