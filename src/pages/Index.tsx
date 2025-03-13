
import React, { useState } from 'react';
import Hero from '../components/Hero';
import CategorySelector from '../components/CategorySelector';
import PopularServices from '../components/PopularServices';
import FeaturedVendors from '../components/FeaturedVendors';
import TicketingEvents from '../components/TicketingEvents';
import FooterSection from '../components/FooterSection';
import Layout from '../components/Layout';
import AIRecommendation from '../components/AIRecommendation';
import EventPlanningAssistant from '../components/EventPlanningAssistant';
import AIAssistantButton from '../components/AIAssistantButton';

const Index = () => {
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <Layout>
      <Hero />
      <div className="relative">
        <CategorySelector />
        <div className="container mx-auto px-4 mb-16 mt-4 flex justify-center">
          <AIAssistantButton onClick={() => setShowAssistant(true)} />
        </div>
        <PopularServices />
        <AIRecommendation />
        <FeaturedVendors />
        <TicketingEvents />
        <FooterSection />
      </div>
      {showAssistant && <EventPlanningAssistant />}
    </Layout>
  );
};

export default Index;
