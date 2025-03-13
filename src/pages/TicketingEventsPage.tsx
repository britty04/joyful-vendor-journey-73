
import React from 'react';
import Layout from '../components/Layout';
import TicketingEvents from '@/components/TicketingEvents';

const TicketingEventsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
        <TicketingEvents />
      </div>
    </Layout>
  );
};

export default TicketingEventsPage;
