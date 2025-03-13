import React from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const ServicesDemo = () => {
  const services = [
    { id: 1, name: 'Photography', description: 'Professional photography services for your event.', price: 500, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Catering', description: 'Delicious catering options for any occasion.', price: 300, image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Venue', description: 'Stunning venues to host your special event.', price: 1000, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-bold">${service.price}</span>
                  <Button>Book Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ServicesDemo;
