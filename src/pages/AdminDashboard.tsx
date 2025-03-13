
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, CheckSquare, AlertTriangle, ImageIcon, MapPin, BarChart3 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AdminVendorList } from '@/components/admin/AdminVendorList';
import { AdminPhotosReview } from '@/components/admin/AdminPhotosReview';
import { AdminLocationManager } from '@/components/admin/AdminLocationManager';
import AdminSalesAnalytics from '@/components/admin/AdminSalesAnalytics';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in and is an admin
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.isLoggedIn && user.isAdmin) {
          setIsAdmin(true);
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
      description: "Please login as an admin to access this dashboard",
      variant: "destructive",
    });
    navigate('/auth');
  };

  if (!isAdmin) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard 
            title="Pending Vendors" 
            value="8" 
            description="Awaiting approval" 
            icon={<Users className="h-5 w-5" />}
            color="bg-amber-50 text-amber-700"
          />
          <DashboardCard 
            title="Pending Photos" 
            value="24" 
            description="Requiring review" 
            icon={<ImageIcon className="h-5 w-5" />}
            color="bg-purple-50 text-purple-700"
          />
          <DashboardCard 
            title="Active Vendors" 
            value="45" 
            description="Approved accounts" 
            icon={<CheckSquare className="h-5 w-5" />}
            color="bg-green-50 text-green-700"
          />
          <DashboardCard 
            title="Flagged Accounts" 
            value="3" 
            description="Potential issues" 
            icon={<AlertTriangle className="h-5 w-5" />}
            color="bg-red-50 text-red-700"
          />
        </div>
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="vendors" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-[800px]">
            <TabsTrigger value="vendors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Vendors</span>
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] text-white">
                8
              </span>
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Photos</span>
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-[10px] text-white">
                24
              </span>
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Locations</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="vendors" className="space-y-4">
            <AdminVendorList />
          </TabsContent>
          
          <TabsContent value="photos" className="space-y-4">
            <AdminPhotosReview />
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <AdminLocationManager />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <AdminSalesAnalytics />
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

export default AdminDashboard;
