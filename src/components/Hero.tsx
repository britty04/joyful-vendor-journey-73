
import React from 'react';
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
    <section className="relative overflow-hidden pt-16 pb-20">
      {/* Decorative Backgrounds */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-eventPurple-50 to-transparent -z-10"></div>
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-eventPink-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute top-40 -left-20 w-72 h-72 bg-eventYellow-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
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
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
          >
            Make your next event 
            <span className="block gradient-text">Magical & Memorable</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto"
          >
            Find the perfect vendors, entertainers, and services for your special occasion.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mb-6 max-w-3xl mx-auto">
            <SearchBar 
              animatePlaceholder={true} 
              onSearch={handleSearch} 
            />
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <Link to="/guided-booking" className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-gray-700 hover:shadow-md hover:border-eventPurple-200 transition-all">
              <Zap className="w-4 h-4 mr-2 text-eventPurple-500" />
              <span>AI Guided Booking</span>
            </Link>
            <Link to="/vendors?category=photography" className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-gray-700 hover:shadow-md hover:border-eventBlue-200 transition-all">
              <Calendar className="w-4 h-4 mr-2 text-eventBlue-500" />
              <span>Event Photography</span>
            </Link>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto text-center"
          >
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-50">
              <div className="text-xl font-bold gradient-text-purple">500+</div>
              <div className="text-gray-600 text-xs">Vendors</div>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-50">
              <div className="text-xl font-bold gradient-text-pink">5,000+</div>
              <div className="text-gray-600 text-xs">Customers</div>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-50">
              <div className="text-xl font-bold gradient-text-blue">20+</div>
              <div className="text-gray-600 text-xs">Categories</div>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-50">
              <div className="text-xl font-bold gradient-text">4.8/5</div>
              <div className="text-gray-600 text-xs">Rating</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
