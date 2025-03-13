import React from 'react';
import { cn } from '@/lib/utils';
import Hero from '@/components/Hero';
import CategorySelector from '@/components/CategorySelector';
import Layout from '@/components/Layout';
import FeaturedVendors from '@/components/FeaturedVendors';
import AIRecommendation from '@/components/AIRecommendation';
import TicketingEvents from '@/components/TicketingEvents';

const Index = () => {
  // Sample popular services
  const services = [
    {
      id: "service1",
      name: "Professional Photography",
      price: 299,
      image: "https://images.unsplash.com/photo-1493863641943-9a9eaaaef7bd?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "service2",
      name: "Live Music Band",
      price: 799,
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "service3",
      name: "Gourmet Catering",
      price: 1299,
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "service4",
      name: "Event Decoration",
      price: 499,
      image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=500&auto=format&fit=crop&q=60"
    },
  ];

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
