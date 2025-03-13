
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import CategorySelector from "@/components/CategorySelector";
import FeaturedVendors from "@/components/FeaturedVendors";
import QuickAddToCart from "@/components/cart/QuickAddToCart";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const PopularServices = () => {
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
    <div className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Popular Services</h2>
        <Button asChild variant="outline">
          <Link to="/services">View All</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              <CardContent className="flex flex-col flex-grow p-5">
                <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                <p className="text-xl font-bold text-primary mt-auto mb-4">${service.price}</p>
                <QuickAddToCart
                  id={service.id}
                  name={service.name}
                  price={service.price}
                  image={service.image}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

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
