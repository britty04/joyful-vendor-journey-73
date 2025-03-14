
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SupportHeader from '@/components/customer-support/SupportHeader';
import SupportTicket from '@/components/customer-support/SupportTicket';
import TicketsList from '@/components/customer-support/TicketsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Ticket, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SupportTickets = () => {
  const [activeTab, setActiveTab] = useState('tickets');

  const handleTicketCreated = () => {
    toast({
      title: "Ticket Created",
      description: "Your support ticket has been submitted successfully.",
    });
    setActiveTab('tickets');
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <SupportHeader />
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 mt-8">
          <h1 className="text-2xl font-bold">Your Support Tickets</h1>
          <div className="flex gap-2">
            <Link to="/support">
              <Button variant="outline" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>Support Hub</span>
              </Button>
            </Link>
            <Button 
              onClick={() => setActiveTab('new-ticket')}
              className="flex items-center gap-2"
            >
              <Ticket className="h-4 w-4" />
              <span>New Ticket</span>
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="tickets">Your Tickets</TabsTrigger>
              <TabsTrigger value="new-ticket">New Ticket</TabsTrigger>
            </TabsList>
            <TabsContent value="tickets">
              <TicketsList />
            </TabsContent>
            <TabsContent value="new-ticket">
              <SupportTicket onTicketCreated={handleTicketCreated} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default SupportTickets;
