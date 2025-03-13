
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin, User, Clock, ShoppingBag, Star, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import CustomerBookings from '@/components/customer/CustomerBookings';
import CustomerAddressManager from '@/components/customer/CustomerAddressManager';
import CustomerReviews from '@/components/customer/CustomerReviews';
import CustomerPaymentMethods from '@/components/customer/CustomerPaymentMethods';

const CustomerProfile = () => {
  const [isCustomer, setIsCustomer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in as a customer
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.isLoggedIn && !user.isAdmin && !user.isVendor) {
          setIsCustomer(true);
        } else {
          redirectToLogin();
        }
      } catch (e) {
        console.error('Failed to parse user data');
        redirectToLogin();
      }
    } else {
      redirectToLogin();
    }
  }, [navigate]);

  const redirectToLogin = () => {
    toast({
      title: "Authentication Required",
      description: "Please login as a customer to access your profile",
      variant: "destructive",
    });
    navigate('/auth');
  };

  if (!isCustomer) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        {/* Profile Summary */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mb-32"></div>
          
          <div className="relative flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-white shadow">
              <User className="h-12 w-12 text-primary/40" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">Sarah Johnson</h2>
              <p className="text-muted-foreground">sarah.johnson@example.com</p>
              
              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                <div className="flex items-center text-sm">
                  <CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Member since March 2023</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center text-sm">
                  <ShoppingBag className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>8 Bookings</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        
        {/* Profile Tabs */}
        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Payments</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings" className="space-y-4">
            <CustomerBookings />
          </TabsContent>
          
          <TabsContent value="addresses" className="space-y-4">
            <CustomerAddressManager />
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-4">
            <CustomerReviews />
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-4">
            <CustomerPaymentMethods />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CustomerProfile;
