import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import Layout from '../components/Layout';
import CustomerAddressManager from '@/components/customer/CustomerAddressManager';
import CustomerBookings from '@/components/customer/CustomerBookings';
import CustomerPaymentMethods from '@/components/customer/CustomerPaymentMethods';
import CustomerReviews from '@/components/customer/CustomerReviews';

const CustomerProfile = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="address">Addresses</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings" className="outline-none">
            <Card>
              <CustomerBookings />
            </Card>
          </TabsContent>
          <TabsContent value="address" className="outline-none">
            <Card>
              <CustomerAddressManager />
            </Card>
          </TabsContent>
          <TabsContent value="payment-methods" className="outline-none">
            <Card>
              <CustomerPaymentMethods />
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="outline-none">
            <Card>
              <CustomerReviews />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CustomerProfile;
