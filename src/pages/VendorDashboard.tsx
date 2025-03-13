
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, Users, Clock, Bell } from 'lucide-react';
import BookingsList from '@/components/dashboard/BookingsList';
import EarningsOverview from '@/components/dashboard/EarningsOverview';
import { toast } from '@/hooks/use-toast';

const VendorDashboard = () => {
  const [isVendor, setIsVendor] = useState(false);
  const [hasPendingBookings, setHasPendingBookings] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in and is a vendor
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.isLoggedIn) {
          // TODO: In a real app, you would check if the user is a vendor
          // For now, we'll just set isVendor to true if the user is logged in
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
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
        
        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard 
            title="New Bookings" 
            value="12" 
            description="Pending confirmation" 
            icon={<Calendar className="h-5 w-5" />}
            color="bg-blue-50 text-blue-700"
          />
          <DashboardCard 
            title="Upcoming Events" 
            value="8" 
            description="Next 30 days" 
            icon={<Clock className="h-5 w-5" />}
            color="bg-green-50 text-green-700"
          />
          <DashboardCard 
            title="Total Customers" 
            value="45" 
            description="Lifetime bookings" 
            icon={<Users className="h-5 w-5" />}
            color="bg-purple-50 text-purple-700"
          />
          <DashboardCard 
            title="Total Revenue" 
            value="$6,250" 
            description="Last 30 days" 
            icon={<DollarSign className="h-5 w-5" />}
            color="bg-amber-50 text-amber-700"
          />
        </div>
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Bookings</span>
              {hasPendingBookings && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  2
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="earnings" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>Earnings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings" className="space-y-4">
            <BookingsList />
          </TabsContent>
          
          <TabsContent value="earnings" className="space-y-4">
            <EarningsOverview />
          </TabsContent>
        </Tabs>
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
}

const DashboardCard = ({ title, value, description, icon, color }: DashboardCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`p-2 rounded-full ${color}`}>{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

export default VendorDashboard;
