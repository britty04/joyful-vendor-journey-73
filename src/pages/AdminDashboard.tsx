
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import Layout from '../components/Layout';
import AdminSalesAnalytics from '@/components/admin/AdminSalesAnalytics';
import { AdminVendorList } from '@/components/admin/AdminVendorList';
import { AdminLocationManager } from '@/components/admin/AdminLocationManager';
import { AdminPhotosReview } from '@/components/admin/AdminPhotosReview';
import AdminVendorManager from '@/components/admin/AdminVendorManager';
import AdminSupportTickets from '@/components/admin/AdminSupportTickets';

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="analytics">
          <TabsList className="mb-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="vendors">Vendor Applications</TabsTrigger>
            <TabsTrigger value="vendorManagement">Vendor Management</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="support">Support Tickets</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
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
          
          <TabsContent value="support">
            <Card className="p-6">
              <AdminSupportTickets />
            </Card>
          </TabsContent>
          
          <TabsContent value="events">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Event Management</h2>
              <p className="text-muted-foreground mb-6">Review and manage upcoming events.</p>
              
              <iframe 
                src="/events" 
                className="w-full h-[600px] border rounded-lg"
                title="Events Preview"
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
