
import React, { useState } from 'react';
import Hero from '../components/Hero';
import CategorySelector from '../components/CategorySelector';
import PopularServices from '../components/PopularServices';
import FeaturedVendors from '../components/FeaturedVendors';
import Layout from '../components/Layout';
import AIRecommendation from '../components/AIRecommendation';
import EventPlanningAssistant from '../components/EventPlanningAssistant';
import AIAssistantButton from '../components/AIAssistantButton';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <Layout>
      <Hero />
      <div className="relative">
        <CategorySelector />
        <div className="container mx-auto px-4 mb-6 mt-2 flex justify-center">
          <AIAssistantButton onClick={() => setShowAssistant(true)} />
        </div>
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <PopularServices />
            <div className="mt-6 text-center">
              <Link to="/services">
                <Button variant="outline">View All Services</Button>
              </Link>
            </div>
          </div>
        </div>
        <AIRecommendation />
        <FeaturedVendors />
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-4">Our support team is ready to assist you with any questions</p>
          <Link to="/support/tickets">
            <Button>Create Support Ticket</Button>
          </Link>
        </div>
      </div>
      {showAssistant && <EventPlanningAssistant />}
    </Layout>
  );
};

export default Index;
