
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';

type VendorAvailability = 'available' | 'limited' | 'booked';

interface VendorAvailabilityBadgeProps {
  availability: VendorAvailability;
  className?: string;
}

const VendorAvailabilityBadge: React.FC<VendorAvailabilityBadgeProps> = ({ 
  availability,
  className
}) => {
  switch (availability) {
    case 'available':
      return (
        <Badge variant="outline" className={`bg-green-50 text-green-700 border-green-200 flex items-center gap-1 ${className}`}>
          <CheckCircle className="w-3 h-3" />
          Available
        </Badge>
      );
    case 'limited':
      return (
        <Badge variant="outline" className={`bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1 ${className}`}>
          <Clock className="w-3 h-3" />
          Limited Availability
        </Badge>
      );
    case 'booked':
      return (
        <Badge variant="outline" className={`bg-red-50 text-red-700 border-red-200 flex items-center gap-1 ${className}`}>
          <AlertTriangle className="w-3 h-3" />
          Fully Booked
        </Badge>
      );
    default:
      return null;
  }
};

export default VendorAvailabilityBadge;
