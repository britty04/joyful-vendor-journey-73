
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, LayoutDashboard, Shield, CreditCard, Settings, CalendarDays, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type UserData = {
  name: string;
  email: string;
  isLoggedIn: boolean;
  isVendor?: boolean;
  isAdmin?: boolean;
};

const UserAuthNav = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for user data on component mount
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  if (user && user.isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-primary text-primary-foreground">
            <span className="sr-only">Open user menu</span>
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuLabel className="text-sm font-normal text-gray-500">{user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {user.isAdmin ? (
            // Admin menu items
            <>
              <DropdownMenuItem asChild>
                <Link to="/admin/dashboard" className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin/vendors" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Manage Vendors</span>
                </Link>
              </DropdownMenuItem>
            </>
          ) : user.isVendor ? (
            // Vendor menu items
            <>
              <DropdownMenuItem asChild>
                <Link to="/vendor/dashboard" className="flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Vendor Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/vendor/bookings" className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span>Manage Bookings</span>
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            // Customer menu items
            <>
              <DropdownMenuItem asChild>
                <Link to="/customer/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/customer/profile" className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span>My Bookings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/customer/profile" className="flex items-center">
                  <Star className="mr-2 h-4 w-4" />
                  <span>My Reviews</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/customer/profile" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Payment Methods</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link to="/auth">
      <Button variant="outline" className="rounded-full px-4">
        Login
      </Button>
    </Link>
  );
};

export default UserAuthNav;
