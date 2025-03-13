
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import Layout from '../components/Layout';
import CustomerAddressManager from '@/components/customer/CustomerAddressManager';
import CustomerBookings from '@/components/customer/CustomerBookings';
import CustomerPaymentMethods from '@/components/customer/CustomerPaymentMethods';
import CustomerReviews from '@/components/customer/CustomerReviews';
import { useLocation, useNavigate } from 'react-router-dom';

const CustomerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get tab from query parameter or use default
  const getInitialTab = () => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    return tab === 'address' || tab === 'payment-methods' || tab === 'reviews' 
      ? tab 
      : 'bookings';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/customer/profile?tab=${value}`, { replace: true });
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-gray-600 mb-6">Manage your bookings, addresses, payment methods, and reviews</p>

          <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-4 w-full grid grid-cols-4">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="address">Addresses</TabsTrigger>
              <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="bookings" className="outline-none">
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <CustomerBookings />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="address" className="outline-none">
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <CustomerAddressManager />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payment-methods" className="outline-none">
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <CustomerPaymentMethods />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="outline-none">
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <CustomerReviews />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerProfile;
