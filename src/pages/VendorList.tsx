
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import VendorCard from '@/components/VendorCard';

const VendorList = () => {
  const [vendors, setVendors] = useState([
    {
      id: '1',
      name: 'Photography Pro',
      category: 'Photography',
      description: 'Professional photography services for all events.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      price: 500,
    },
    {
      id: '2',
      name: 'Catering Experts',
      category: 'Catering',
      description: 'Delicious catering options for any occasion.',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.2,
      price: 300,
    },
    {
      id: '3',
      name: 'Venue Masters',
      category: 'Venue',
      description: 'Stunning venues for weddings, parties, and corporate events.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      price: 1000,
    },
  ]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Our Vendors</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <VendorCard 
              key={vendor.id} 
              vendor={vendor} 
              reviewCount={Math.floor(Math.random() * 50) + 10}
              location="Local Area"
              badges={vendor.rating > 4.5 ? ['Top Rated'] : []}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button>Load More</Button>
        </div>
      </div>
    </Layout>
  );
};

export default VendorList;
