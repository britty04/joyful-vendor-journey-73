
import React from 'react';
import { Button } from '@/components/ui/button';

interface Service {
  id: string;
  name: string;
  price: number;
  image: string;
}

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
    <div>
      <h2 className="text-2xl font-bold mb-6">Popular Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-40 overflow-hidden">
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-base mb-2">{service.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">${service.price}</span>
                <Button size="sm">Book Now</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularServices;
