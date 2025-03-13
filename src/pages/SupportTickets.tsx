
import React from 'react';
import Layout from '@/components/Layout';
import SupportHeader from '@/components/customer-support/SupportHeader';
import SupportTicket from '@/components/customer-support/SupportTicket';
import TicketsList from '@/components/customer-support/TicketsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SupportTickets = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <SupportHeader />
        
        <div className="mt-10">
          <Tabs defaultValue="tickets" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="tickets">Your Tickets</TabsTrigger>
              <TabsTrigger value="new-ticket">New Ticket</TabsTrigger>
            </TabsList>
            <TabsContent value="tickets">
              <TicketsList />
            </TabsContent>
            <TabsContent value="new-ticket">
              <SupportTicket />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default SupportTickets;
