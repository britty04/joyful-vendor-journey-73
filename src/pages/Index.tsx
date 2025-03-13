
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronRight, CheckCircle } from 'lucide-react';
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
      
      <CategorySelector />
      
      <div className="container mx-auto px-4">
        <PopularServices />
      </div>
      
      {/* Kids Events Special Section */}
      <div className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-eventPurple-50 to-eventPink-50 -z-10"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-100 rounded-full opacity-60 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-blue-100 rounded-full opacity-60 animate-float" style={{animationDelay: "1.5s"}}></div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-2 mb-5 bg-violet-100 rounded-full text-violet-700">
                <Sparkles size={16} className="mr-2 text-eventPurple-500" />
                <span className="text-sm font-medium">Kids Birthday Special</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text-purple mb-6">
                Create Unforgettable Birthday Parties
              </h2>
              <p className="text-gray-600 mb-8">
                Make your child's special day truly magical with our curated collection of entertainment services. From magicians and face painters to balloon artists and themed characters, we have everything to create the perfect birthday celebration!
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Verified Entertainers</h3>
                    <p className="text-gray-600">All our kids' entertainers are background-checked and highly rated</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Easy Booking</h3>
                    <p className="text-gray-600">Book with just a few clicks and secure your date instantly</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Party Packages</h3>
                    <p className="text-gray-600">Save with our complete party packages including entertainment, food, and decorations</p>
                  </div>
                </div>
              </div>
              
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-eventPurple-500 to-eventPink-500 hover:from-eventPurple-600 hover:to-eventPink-600 text-white px-6 shadow-lg"
              >
                <Link to="/vendors?category=entertainers&event=kids">
                  Explore Kids Entertainers
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1602306834394-6c8b7ea0ed9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Magic show" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-lg transform translate-y-6 hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1595752024492-a51dd6a80825?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Face painting" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-lg transform translate-y-4 hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Balloon art" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Kids party" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-eventPurple-50 to-eventPink-50 py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="gradient-text">Try Our New Shopping Experience</span>
          </h2>
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
      
      <AIRecommendation />
      
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold gradient-text-purple mb-6">
            Ready to Make Your Event Special?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of people who have successfully planned their perfect events using our platform.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-eventPurple-500 to-eventPink-500 hover:from-eventPurple-600 hover:to-eventPink-600 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Link to="/guided-booking">
                <Sparkles className="w-5 h-5 mr-2" />
                <span>Start Planning Now</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-6 rounded-xl"
            >
              <Link to="/vendor/onboarding">
                <span>Become a Vendor</span>
              </Link>
            </Button>
          </div>
          
          <div className="flex justify-center mt-12">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" 
                    alt="Customer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "I was able to plan my daughter's entire birthday party in under an hour! From the magician to the cake, everything was perfect and the kids had a blast. This platform is a game changer for busy parents!"
                  </p>
                  <div>
                    <p className="font-medium text-gray-900">Sarah Johnson</p>
                    <p className="text-gray-500 text-sm">Mother of two, Mumbai</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
