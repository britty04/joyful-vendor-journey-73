
import React, { useState } from 'react';
import Hero from '../components/Hero';
import CategorySelector from '../components/CategorySelector';
import PopularServices from '../components/PopularServices';
import FeaturedVendors from '../components/FeaturedVendors';
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
        <div className="container mx-auto px-4 mb-10 mt-2 flex justify-center">
          <AIAssistantButton onClick={() => setShowAssistant(true)} />
        </div>
        <div className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <PopularServices />
          </div>
        </div>
        <AIRecommendation />
        <FeaturedVendors />
      </div>
      {showAssistant && <EventPlanningAssistant />}
    </Layout>
  );
};

export default Index;
