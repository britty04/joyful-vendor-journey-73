
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

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
    <div className="space-y-4">
      {services.map((service) => (
        <Card key={service.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/4 h-32 sm:h-auto">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow">
                <h3 className="font-medium text-lg">{service.name}</h3>
                <p className="text-gray-500">
                  Date: {format(new Date(service.date), 'dd MMM yyyy')}
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-lg font-semibold">₹{service.price.toLocaleString()}</p>
                  {service.quantity && service.quantity > 1 && (
                    <p className="text-gray-600">Quantity: {service.quantity}</p>
                  )}
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
