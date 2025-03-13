
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Calendar, Clock, Users, DollarSign, BanknoteIcon, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Layout from '../components/Layout';
import VendorProfile from '@/components/dashboard/VendorProfile';
import BookingsList from '@/components/dashboard/BookingsList';
import EarningsOverview from '@/components/dashboard/EarningsOverview';
import TransferEarnings from '@/components/dashboard/TransferEarnings';

const VendorDashboard = () => {
  const [isVendor, setIsVendor] = useState(false);
  const [hasPendingBookings, setHasPendingBookings] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.isLoggedIn) {
          setIsVendor(true);
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
      description: "Please login as a vendor to access the dashboard",
      variant: "destructive",
    });
    navigate('/auth');
  };

  if (!isVendor) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 relative">
        <div className="absolute top-20 right-0 w-64 h-64 bg-purple-100 rounded-full opacity-30 blur-3xl -z-10"></div>
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl -z-10"></div>
        
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <div className="bg-primary/10 p-1 rounded-full">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <DashboardCard 
            title="New Bookings" 
            value="12" 
            description="Pending confirmation" 
            icon={<Calendar className="h-5 w-5" />}
            color="bg-blue-50 text-blue-700"
            animation="hover:translate-y-[-5px]"
          />
          <DashboardCard 
            title="Upcoming Events" 
            value="8" 
            description="Next 30 days" 
            icon={<Clock className="h-5 w-5" />}
            color="bg-green-50 text-green-700"
            animation="hover:translate-y-[-5px]"
          />
          <DashboardCard 
            title="Total Customers" 
            value="45" 
            description="Lifetime bookings" 
            icon={<Users className="h-5 w-5" />}
            color="bg-purple-50 text-purple-700"
            animation="hover:translate-y-[-5px]"
          />
          <DashboardCard 
            title="Total Revenue" 
            value="$6,250" 
            description="Last 30 days" 
            icon={<DollarSign className="h-5 w-5" />}
            color="bg-amber-50 text-amber-700"
            animation="hover:translate-y-[-5px]"
          />
        </div>
        
        <div className="bg-gradient-to-r from-white to-purple-50 p-6 rounded-xl shadow-sm">
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[600px] bg-white/60 backdrop-blur-sm">
              <TabsTrigger value="bookings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Calendar className="h-4 w-4" />
                <span>Bookings</span>
                {hasPendingBookings && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    2
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="earnings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <DollarSign className="h-4 w-4" />
                <span>Earnings</span>
              </TabsTrigger>
              <TabsTrigger value="transfer" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <BanknoteIcon className="h-4 w-4" />
                <span>Transfer</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings" className="space-y-4 animate-fade-in">
              <BookingsList />
            </TabsContent>
            
            <TabsContent value="earnings" className="space-y-4 animate-fade-in">
              <EarningsOverview />
            </TabsContent>

            <TabsContent value="transfer" className="space-y-4 animate-fade-in">
              <TransferEarnings />
            </TabsContent>

            <TabsContent value="profile" className="space-y-4 animate-fade-in">
              <VendorProfile />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  animation: string;
}

const DashboardCard = ({ title, value, description, icon, color, animation }: DashboardCardProps) => (
  <Card className={`overflow-hidden transition-all duration-300 ${animation} hover:shadow-lg`}>
    <div className="relative h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-primary"></div>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </div>
  </Card>
);

export default VendorDashboard;
