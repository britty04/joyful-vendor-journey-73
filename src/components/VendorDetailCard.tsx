
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Clock, Info, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  const [detailsOpen, setDetailsOpen] = useState(false);
  
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
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary px-0 mt-2"
          onClick={() => setDetailsOpen(true)}
        >
          <Info className="h-4 w-4 mr-1" />
          Show more details
        </Button>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 flex justify-between items-center border-t border-gray-100 mt-auto">
        <div>
          <span className="font-bold text-primary text-lg">₹{vendor.price.toLocaleString()}</span>
          <span className="text-gray-500 text-sm ml-1">starting price</span>
        </div>
        <Button onClick={onBook}>Book Now</Button>
      </CardFooter>
      
      {/* Vendor detail dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{vendor.name}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={vendor.image} 
                  alt={vendor.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-sm">
                  <Star className="w-4 h-4 mr-1 fill-amber-500 text-amber-500" />
                  {vendor.rating.toFixed(1)} Rating
                </div>
                <div className="text-gray-500 text-sm">
                  {reviewCount} reviews
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-800 mb-1">About</h3>
                <p className="text-gray-600">
                  {vendor.description}
                  <br /><br />
                  We specialize in creating memorable {vendor.category.toLowerCase()} services for all types of events. 
                  Our team has over 5 years of experience and we pride ourselves on our professionalism and attention to detail.
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-800 mb-2">Event Types</h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.eventTypes.map(eventType => (
                    <Badge key={eventType} variant="outline" className="capitalize">
                      {eventType}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-gray-800 mb-2">Pricing</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Standard Package</span>
                    <span className="font-medium">₹{vendor.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Premium Package</span>
                    <span className="font-medium">₹{Math.round(vendor.price * 1.5).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Deluxe Package</span>
                    <span className="font-medium">₹{Math.round(vendor.price * 2).toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Prices may vary based on event specifics, location, and date
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-800 mb-2">Services Include</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Professional {vendor.category.toLowerCase()} services</li>
                  <li>Setup and preparation</li>
                  <li>All necessary equipment</li>
                  <li>Expert assistance throughout the event</li>
                  <li>Post-event cleanup</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-800 mb-2">Availability</h3>
                <div className="flex items-center mb-2">
                  <VendorAvailabilityBadge availability={vendor.availability} />
                </div>
                <p className="text-gray-600 text-sm">
                  {vendor.availability === 'available' 
                    ? 'This vendor has good availability for upcoming dates.'
                    : vendor.availability === 'limited'
                      ? 'This vendor has limited availability. Book soon to secure your date.'
                      : 'This vendor is currently fully booked. Please check back later or contact for waitlist options.'}
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-800 mb-2">Contact Information</h3>
                <div className="text-gray-600">
                  <p>Phone: +91 98765 43210</p>
                  <p>Email: contact@{vendor.name.toLowerCase().replace(/\s+/g, '')}.com</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  className="w-full"
                  onClick={() => {
                    setDetailsOpen(false);
                    if (onBook) onBook();
                  }}
                >
                  Book Now
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  asChild
                >
                  <a href={`/vendor/${vendor.id}`} target="_blank" rel="noopener noreferrer">
                    View Full Profile
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default VendorDetailCard;
