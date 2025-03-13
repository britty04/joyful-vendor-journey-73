
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Award, Clock, MapPin, CheckCircle, ShieldCheck, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  verified?: boolean;
  responseTime?: string;
  successRate?: number;
  availability?: 'available' | 'limited' | 'booked';
}

interface VendorCardProps {
  vendor: Vendor;
  reviewCount: number;
  location: string;
  badges?: string[];
  className?: string;
}

const VendorCard = ({ vendor, reviewCount, location, badges = [], className }: VendorCardProps) => {
  // Trust signal indicators
  const showVerifiedBadge = vendor.verified || vendor.rating > 4.5;
  const availabilityText = vendor.availability === 'available' 
    ? 'Available Now' 
    : vendor.availability === 'limited' 
      ? 'Few Slots Left' 
      : vendor.availability === 'booked' 
        ? 'Fully Booked' 
        : null;
  
  const availabilityColor = vendor.availability === 'available' 
    ? 'text-green-600 bg-green-100' 
    : vendor.availability === 'limited' 
      ? 'text-amber-600 bg-amber-100' 
      : 'text-red-600 bg-red-100';

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg group", className)}>
      <div className="relative">
        <img 
          src={vendor.image} 
          alt={vendor.name} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {badges.includes('Top Rated') && (
            <Badge variant="secondary" className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-none">
              <Award size={12} className="mr-1" />
              Top Rated
            </Badge>
          )}
          
          {showVerifiedBadge && (
            <Badge variant="secondary" className="flex items-center gap-1 bg-blue-600 text-white border-none">
              <ShieldCheck size={12} className="mr-1" />
              Verified
            </Badge>
          )}
          
          {availabilityText && (
            <Badge variant="outline" className={cn("flex items-center gap-1", availabilityColor)}>
              <Clock size={12} className="mr-1" />
              {availabilityText}
            </Badge>
          )}
        </div>
        
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white text-gray-800 flex items-center">
            {vendor.category}
          </Badge>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white px-4 py-3">
          <div className="flex justify-between items-end">
            <h3 className="font-semibold text-lg">{vendor.name}</h3>
            <div className="flex items-center bg-white text-yellow-500 px-2 py-1 rounded text-sm font-medium">
              <Star size={14} className="fill-yellow-500 text-yellow-500 mr-1" />
              {vendor.rating}
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1" />
            {location}
          </div>
          <div className="text-sm text-gray-600">
            {reviewCount} reviews
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {vendor.description}
        </p>
        
        {/* Trust Signals */}
        <div className="flex flex-wrap gap-2 mb-4">
          {vendor.responseTime && (
            <div className="text-xs flex items-center text-gray-600">
              <Clock size={12} className="mr-1 text-gray-400" />
              {vendor.responseTime} response
            </div>
          )}
          
          {vendor.successRate && (
            <div className="text-xs flex items-center text-gray-600">
              <ThumbsUp size={12} className="mr-1 text-gray-400" />
              {vendor.successRate}% success rate
            </div>
          )}
          
          {(vendor.rating > 4.0) && (
            <div className="text-xs flex items-center text-gray-600">
              <CheckCircle size={12} className="mr-1 text-green-500" />
              Highly Rated
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-800 font-bold">₹{vendor.price.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">/service</span>
          </div>
          
          <Button asChild>
            <Link to={`/vendor/${vendor.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorCard;
