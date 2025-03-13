import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import VendorCard from '@/components/VendorCard';
import { Filter, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import VendorAvailabilityBadge from '@/components/VendorAvailabilityBadge';
import VendorTrustSignals from '@/components/VendorTrustSignals';

// Define a type for the vendor availability to match the expected values
type VendorAvailability = 'available' | 'limited' | 'booked';

// Define a type for a vendor
export interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  eventTypes: string[];
  verified: boolean;
  responseTime: string;
  successRate: number;
  availability: VendorAvailability;
}

const VendorList = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const eventParam = searchParams.get('event');

  const [allVendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'Photography Pro',
      category: 'Photography',
      description: 'Professional photography services for all events.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      price: 5000,
      eventTypes: ['wedding', 'corporate', 'birthday'],
      verified: true,
      responseTime: '1 hour',
      successRate: 98,
      availability: 'available' as VendorAvailability
    },
    {
      id: '2',
      name: 'Catering Experts',
      category: 'Catering',
      description: 'Delicious catering options for any occasion.',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.2,
      price: 3000,
      eventTypes: ['wedding', 'corporate', 'kids'],
      verified: true,
      responseTime: '2 hours',
      successRate: 95,
      availability: 'limited' as VendorAvailability
    },
    {
      id: '3',
      name: 'Venue Masters',
      category: 'Venue',
      description: 'Stunning venues for weddings, parties, and corporate events.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      price: 10000,
      eventTypes: ['wedding', 'corporate'],
      verified: true,
      responseTime: '45 minutes',
      successRate: 99,
      availability: 'limited' as VendorAvailability
    },
    {
      id: '4',
      name: 'Magical Entertainment',
      category: 'Entertainers',
      description: 'Magicians, clowns, and character actors for children\'s parties.',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      price: 3500,
      eventTypes: ['kids', 'birthday'],
      verified: false,
      responseTime: '3 hours',
      successRate: 92,
      availability: 'available' as VendorAvailability
    },
    {
      id: '5',
      name: 'Wedding Decor Specialists',
      category: 'Decorators',
      description: 'Beautiful wedding decorations for your special day.',
      image: 'https://images.unsplash.com/photo-1546173159-315724a31696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      price: 6000,
      eventTypes: ['wedding'],
      verified: true,
      responseTime: '1 hour',
      successRate: 97,
      availability: 'booked' as VendorAvailability
    },
    {
      id: '6',
      name: 'Tech Solutions',
      category: 'Technology',
      description: 'AV equipment, presentation support, and tech services for corporate events.',
      image: 'https://images.unsplash.com/photo-1553406830-ef356b05c42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.3,
      price: 8000,
      eventTypes: ['corporate'],
      verified: false,
      responseTime: '2 hours',
      successRate: 90,
      availability: 'available' as VendorAvailability
    },
    {
      id: '7',
      name: 'Glam Squad',
      category: 'Makeup',
      description: 'Professional makeup artists for brides and special occasions.',
      image: 'https://images.unsplash.com/photo-1487412840807-a91612003d50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      price: 4500,
      eventTypes: ['wedding'],
      verified: true,
      responseTime: '30 minutes',
      successRate: 98,
      availability: 'limited' as VendorAvailability
    },
    {
      id: '8',
      name: 'Balloon Wonderland',
      category: 'Decorators',
      description: 'Balloon decorations and party props for kids\' events.',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      price: 2500,
      eventTypes: ['kids', 'birthday'],
      verified: false,
      responseTime: '2 hours',
      successRate: 94,
      availability: 'available' as VendorAvailability
    },
  ]);

  // Filter vendors based on URL parameters
  const filteredVendors = allVendors.filter(vendor => {
    // If both category and event type filters are applied
    if (categoryParam && eventParam) {
      return vendor.category.toLowerCase() === categoryParam.toLowerCase() && 
             vendor.eventTypes.includes(eventParam.toLowerCase());
    }
    // If only category filter is applied
    else if (categoryParam) {
      return vendor.category.toLowerCase() === categoryParam.toLowerCase();
    }
    // If only event type filter is applied
    else if (eventParam) {
      return vendor.eventTypes.includes(eventParam.toLowerCase());
    }
    // No filters, return all vendors
    return true;
  });

  // Generate page title based on filters
  const getPageTitle = () => {
    if (categoryParam && eventParam) {
      return `${categoryParam} for ${eventParam.charAt(0).toUpperCase() + eventParam.slice(1)} Events`;
    } else if (categoryParam) {
      return `${categoryParam} Vendors`;
    } else if (eventParam) {
      return `Vendors for ${eventParam.charAt(0).toUpperCase() + eventParam.slice(1)} Events`;
    }
    return 'All Vendors';
  };

  // Generate appropriate badges for each vendor
  const getVendorBadges = (vendor: Vendor) => {
    const badges = [];
    
    // Top rated vendors
    if (vendor.rating >= 4.8) {
      badges.push('Top Rated');
    }
    
    // Fast response time
    if (vendor.responseTime === '30 minutes' || vendor.responseTime === '1 hour') {
      badges.push('Quick Response');
    }
    
    // High success rate
    if (vendor.successRate >= 95) {
      badges.push('Highly Reliable');
    }
    
    return badges;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
            <div className="flex items-center">
              <p className="text-gray-600">{filteredVendors.length} vendors available</p>
              {eventParam && (
                <Badge variant="outline" className="ml-2 bg-gray-100">
                  {eventParam.charAt(0).toUpperCase() + eventParam.slice(1)}
                </Badge>
              )}
              {categoryParam && (
                <Badge variant="outline" className="ml-2 bg-gray-100">
                  {categoryParam}
                </Badge>
              )}
            </div>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
        </div>

        {filteredVendors.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No vendors found</h2>
            <p className="text-gray-500 mb-8">Try adjusting your filters or browse all vendors</p>
            <Button asChild>
              <a href="/vendors">View All Vendors</a>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <VendorCard 
                  key={vendor.id} 
                  vendor={vendor} 
                  reviewCount={Math.floor(Math.random() * 50) + 10}
                  location="Local Area"
                  badges={getVendorBadges(vendor)}
                />
              ))}
            </div>
            {filteredVendors.length > 6 && (
              <div className="text-center mt-8">
                <Button>Load More</Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default VendorList;
