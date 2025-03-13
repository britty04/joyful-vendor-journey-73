
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import QuickAddToCart from '@/components/cart/QuickAddToCart';

// Sample service data
const services = [
  {
    id: '1',
    name: 'Wedding Photography',
    price: 25000,
    description: 'Professional photography services for your special day. Includes pre-wedding shoot and digital album.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Catering Service',
    price: 35000,
    description: 'Premium catering with diverse menu options. Includes setup, service staff, and cleanup.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Venue Decoration',
    price: 18000,
    description: 'Beautiful decorations for any venue. Custom themes and color schemes available.',
    image: 'https://images.unsplash.com/photo-1602023039928-7af5b1954d9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'DJ & Music',
    price: 12000,
    description: 'Professional DJ services with state-of-the-art sound equipment and customized playlists.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Wedding Cake',
    price: 8000,
    description: 'Custom designed wedding cakes. Various flavors, sizes, and decorations available.',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474d7f5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    name: 'Event Planning',
    price: 40000,
    description: 'Full event planning and coordination services. Let us handle all the details for your special day.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const ServicesDemo = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our premium event services to make your special day truly unforgettable. Add items to your cart to begin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 shadow-lg rounded-2xl"
            >
              <div className="h-52 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-xl">{service.name}</h3>
                  <p className="font-bold text-eventPurple-600">₹{service.price.toLocaleString()}</p>
                </div>
                <p className="text-gray-600 mt-2">{service.description}</p>
              </CardContent>
              <CardFooter>
                <QuickAddToCart
                  id={service.id}
                  name={service.name}
                  price={service.price}
                  image={service.image}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ServicesDemo;
