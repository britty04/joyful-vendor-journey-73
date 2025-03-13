import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Calendar, Zap, Star, ChevronRight } from 'lucide-react';
import SearchBar from '@/components/search/SearchBar';

const Hero = () => {
  const navigate = useNavigate();
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const handleSearch = (query: string) => {
    navigate(`/vendors?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      {/* Decorative Backgrounds */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-eventPurple-50 to-transparent -z-10"></div>
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-eventPink-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute top-40 -left-20 w-72 h-72 bg-eventYellow-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      
      {/* Animated Elements */}
      <div className="absolute top-1/4 left-10 w-8 h-8 animate-float" style={{ animationDuration: '6s' }}>
        <div className="w-full h-full bg-eventPink-300 opacity-70 rounded-full"></div>
      </div>
      <div className="absolute top-1/3 right-16 w-6 h-6 animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}>
        <div className="w-full h-full bg-eventYellow-300 opacity-70 rounded-md rotate-45"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 w-10 h-10 animate-float" style={{ animationDuration: '7s', animationDelay: '0.5s' }}>
        <div className="w-full h-full bg-eventBlue-300 opacity-70 rounded-full"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 mb-6 bg-white rounded-full shadow-md text-eventPurple-600 border border-eventPurple-100"
          >
            <Sparkles className="w-4 h-4 mr-2 text-eventPurple-500" />
            <span className="text-sm font-medium">The best event planning platform</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Make your next event 
            <span className="block gradient-text">Magical & Memorable</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
          >
            Find the perfect vendors, entertainers, and services for your special occasion. 
            From birthdays and weddings to corporate events - we've got you covered!
          </motion.p>
          
          <motion.div variants={itemVariants} className="mb-8 max-w-3xl mx-auto">
            <SearchBar 
              animatePlaceholder={true} 
              onSearch={handleSearch} 
            />
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 md:gap-5 mb-12"
          >
            <Link to="/guided-booking" className="flex items-center px-4 py-3 bg-white rounded-full shadow-sm border border-gray-100 text-gray-700 hover:shadow-md hover:border-eventPurple-200 transition-all">
              <Zap className="w-4 h-4 mr-2 text-eventPurple-500" />
              <span>AI Guided Booking</span>
            </Link>
            <Link to="/vendors?category=entertainers&event=kids" className="flex items-center px-4 py-3 bg-white rounded-full shadow-sm border border-gray-100 text-gray-700 hover:shadow-md hover:border-eventPink-200 transition-all">
              <Star className="w-4 h-4 mr-2 text-eventPink-500" />
              <span>Kids Entertainment</span>
            </Link>
            <Link to="/vendors?category=photography" className="flex items-center px-4 py-3 bg-white rounded-full shadow-sm border border-gray-100 text-gray-700 hover:shadow-md hover:border-eventBlue-200 transition-all">
              <Calendar className="w-4 h-4 mr-2 text-eventBlue-500" />
              <span>Event Photography</span>
            </Link>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center"
          >
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50">
              <div className="text-2xl font-bold gradient-text-purple">500+</div>
              <div className="text-gray-600 text-sm">Verified Vendors</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50">
              <div className="text-2xl font-bold gradient-text-pink">5,000+</div>
              <div className="text-gray-600 text-sm">Happy Customers</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50">
              <div className="text-2xl font-bold gradient-text-blue">20+</div>
              <div className="text-gray-600 text-sm">Service Categories</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50">
              <div className="text-2xl font-bold gradient-text">4.8/5</div>
              <div className="text-gray-600 text-sm">Customer Rating</div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12"
          >
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-eventPurple-500 to-eventPink-500 hover:from-eventPurple-600 hover:to-eventPink-600 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Link to="/vendor/onboarding">
                <Sparkles className="w-5 h-5 mr-2" />
                <span>Become a Vendor</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <p className="text-gray-500 text-sm mt-3">No sign-up fee. Commissions only on bookings.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
