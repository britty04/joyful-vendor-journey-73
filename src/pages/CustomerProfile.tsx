
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, User, Clock, ShoppingBag, Star, CreditCard, Camera, PenSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import CustomerBookings from '@/components/customer/CustomerBookings';
import CustomerAddressManager from '@/components/customer/CustomerAddressManager';
import CustomerReviews from '@/components/customer/CustomerReviews';
import CustomerPaymentMethods from '@/components/customer/CustomerPaymentMethods';
import QuickAddToCart from '@/components/cart/QuickAddToCart';
import { motion } from 'framer-motion';

const CustomerProfile = () => {
  const [isCustomer, setIsCustomer] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    location: 'San Francisco, CA',
    bookings: 8,
    joinDate: 'March 2023',
    profileImage: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in as a customer
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      try {
        const user = JSON.parse(storedUserData);
        if (user.isLoggedIn && !user.isAdmin && !user.isVendor) {
          setIsCustomer(true);
          // Update user data if available (in a real app, you'd fetch this from an API)
          if (user.name) {
            setUserData(prev => ({
              ...prev,
              name: user.name,
              email: user.email || prev.email
            }));
          }
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

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Save profile changes
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated",
      });
      
      // Update localStorage with new user data
      const storedUserData = localStorage.getItem('user');
      if (storedUserData) {
        try {
          const user = JSON.parse(storedUserData);
          localStorage.setItem('user', JSON.stringify({
            ...user,
            name: userData.name,
            email: userData.email
          }));
        } catch (e) {
          console.error('Failed to update user data');
        }
      }
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
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
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-white shadow">
                <User className="h-12 w-12 text-primary/40" />
              </div>
              {isEditing && (
                <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white shadow-sm">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={userData.name}
                    onChange={handleProfileChange}
                    className="w-full p-2 border rounded-md"
                  />
                  <label className="text-sm font-medium">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={userData.email}
                    onChange={handleProfileChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="text-muted-foreground">{userData.email}</p>
                </>
              )}
              
              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                <div className="flex items-center text-sm">
                  <CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Member since {userData.joinDate}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <ShoppingBag className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{userData.bookings} Bookings</span>
                </div>
              </div>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex gap-2 mt-4 md:mt-0"
            >
              <Button 
                onClick={handleEditProfile}
                className="flex items-center gap-2"
                variant={isEditing ? "secondary" : "default"}
              >
                {isEditing ? (
                  <>Save Changes</>
                ) : (
                  <><PenSquare className="h-4 w-4" /> Edit Profile</>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Recommended Services */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <RecommendedServiceCard 
              id="rec1"
              name="Premium Photography"
              description="Professional event photography with edited digital album"
              price={299}
              image="/placeholder.svg"
            />
            <RecommendedServiceCard 
              id="rec2"
              name="DJ Services"
              description="Experienced DJ with premium sound equipment"
              price={399}
              image="/placeholder.svg"
            />
            <RecommendedServiceCard 
              id="rec3"
              name="Catering Package"
              description="Gourmet food service for up to 50 guests"
              price={899}
              image="/placeholder.svg"
            />
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

interface RecommendedServiceProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const RecommendedServiceCard = ({ id, name, description, price, image }: RecommendedServiceProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="h-40 bg-gray-100 relative">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
          ${price}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <QuickAddToCart 
          id={id}
          name={name}
          price={price}
          image={image}
        />
      </CardContent>
    </Card>
  );
};

export default CustomerProfile;
