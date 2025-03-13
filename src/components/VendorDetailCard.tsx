
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Clock } from 'lucide-react';
import VendorAvailabilityBadge from './VendorAvailabilityBadge';
import VendorTrustSignals from './VendorTrustSignals';
import VendorPerformanceInsights from './VendorPerformanceInsights';

interface VendorDetailCardProps {
  vendor: {
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
    availability: 'available' | 'limited' | 'booked';
  };
  reviewCount: number;
  location: string;
  badges?: string[];
  showPerformanceInsights?: boolean;
  onBook?: () => void;
}

const VendorDetailCard: React.FC<VendorDetailCardProps> = ({
  vendor,
  reviewCount,
  location,
  badges = [],
  showPerformanceInsights = false,
  onBook
}) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img 
          src={vendor.image} 
          alt={vendor.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <VendorAvailabilityBadge availability={vendor.availability} />
        </div>
      </div>
      
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{vendor.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="font-semibold">{vendor.rating}</span>
            <span className="text-gray-500 text-sm ml-1">({reviewCount})</span>
          </div>
        </div>
        
        <Badge variant="outline" className="mb-2 bg-gray-50">
          {vendor.category}
        </Badge>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{vendor.description}</p>
        
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="mb-4">
          <VendorTrustSignals 
            verified={vendor.verified} 
            responseTime={vendor.responseTime} 
            successRate={vendor.successRate} 
            customBadges={badges}
          />
        </div>
        
        {showPerformanceInsights && (
          <VendorPerformanceInsights 
            rating={vendor.rating}
            reviewCount={reviewCount}
            successRate={vendor.successRate}
            responseTime={vendor.responseTime}
            bookingsCompleted={Math.floor(Math.random() * 200) + 50}
          />
        )}
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 flex justify-between items-center border-t border-gray-100 mt-auto">
        <div>
          <span className="font-bold text-primary text-lg">₹{vendor.price.toLocaleString()}</span>
          <span className="text-gray-500 text-sm ml-1">starting price</span>
        </div>
        <Button onClick={onBook}>Book Now</Button>
      </CardFooter>
    </Card>
  );
};

export default VendorDetailCard;
