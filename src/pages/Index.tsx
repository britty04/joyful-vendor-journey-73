
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import CategorySelector from '@/components/CategorySelector';
import Layout from '@/components/Layout';
import FeaturedVendors from '@/components/FeaturedVendors';
import AIRecommendation from '@/components/AIRecommendation';
import TicketingEvents from '@/components/TicketingEvents';
import PopularServices from '@/components/PopularServices';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <CategorySelector />
      </div>
      
      <div className="container mx-auto px-4">
        <PopularServices />
      </div>
      
      <div className="bg-gradient-to-r from-eventPurple-50 to-eventPink-50 py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Try Our New Shopping Experience</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Browse our curated collection of services, add them to your cart, and complete your booking in minutes!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-eventPurple-500 hover:bg-eventPurple-600 text-white px-8"
            >
              <Link to="/services">Browse Services</Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="border-eventPurple-300 text-eventPurple-700 hover:bg-eventPurple-50"
            >
              <Link to="/guided-booking">Try AI Guided Booking</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <FeaturedVendors />
      </div>
    </Layout>
  );
};

export default Index;
