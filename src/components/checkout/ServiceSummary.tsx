
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { PartyPopper, Calendar, Sparkles } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: number;
  date: Date;
  image: string;
  quantity?: number; // Added quantity as optional
}

interface ServiceSummaryProps {
  services: Service[];
}

const ServiceSummary: React.FC<ServiceSummaryProps> = ({ services }) => {
  return (
    <div className="space-y-6">
      {services.map((service) => (
        <Card 
          key={service.id} 
          className="overflow-hidden border-0 shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl"
        >
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/3 h-48 sm:h-auto relative group">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center text-sm font-medium text-primary shadow-md">
                  <PartyPopper size={16} className="mr-1.5" />
                  <span>Premium Service</span>
                </div>
              </div>
              <div className="p-6 flex-grow bg-white">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-xl text-gray-900">{service.name}</h3>
                      <div className="flex items-center text-eventPurple-600 bg-eventPurple-50 px-3 py-1 rounded-full">
                        <Sparkles size={14} className="mr-1.5" />
                        <span className="text-sm font-medium">Top Rated</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      <p>{format(new Date(service.date), 'EEE, dd MMM yyyy')}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Price</p>
                      <p className="text-2xl font-bold text-eventPurple-600">₹{service.price.toLocaleString()}</p>
                    </div>
                    {service.quantity && service.quantity > 1 && (
                      <div className="mt-2 sm:mt-0 bg-gray-100 px-4 py-2 rounded-full">
                        <p className="text-gray-700 font-medium">Quantity: {service.quantity}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceSummary;
