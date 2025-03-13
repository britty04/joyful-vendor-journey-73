
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import Layout from '../components/Layout';
import AdminSalesAnalytics from '@/components/admin/AdminSalesAnalytics';
import AdminVendorList from '@/components/admin/AdminVendorList';
import AdminLocationManager from '@/components/admin/AdminLocationManager';
import AdminPhotosReview from '@/components/admin/AdminPhotosReview';
import AdminVendorManager from '@/components/admin/AdminVendorManager';

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="analytics">
          <TabsList className="mb-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="vendorManagement">Vendor Management</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics">
            <Card className="p-6">
              <AdminSalesAnalytics />
            </Card>
          </TabsContent>
          
          <TabsContent value="vendors">
            <Card className="p-6">
              <AdminVendorList />
            </Card>
          </TabsContent>
          
          <TabsContent value="vendorManagement">
            <AdminVendorManager />
          </TabsContent>
          
          <TabsContent value="locations">
            <Card className="p-6">
              <AdminLocationManager />
            </Card>
          </TabsContent>
          
          <TabsContent value="photos">
            <Card className="p-6">
              <AdminPhotosReview />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
