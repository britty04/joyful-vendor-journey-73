
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, Clock, Percent, Award } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VendorTrustSignalsProps {
  verified: boolean;
  responseTime?: string;
  successRate?: number;
  customBadges?: string[];
  showLabels?: boolean;
}

const VendorTrustSignals: React.FC<VendorTrustSignalsProps> = ({
  verified,
  responseTime,
  successRate,
  customBadges = [],
  showLabels = false
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {verified && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {showLabels && "Verified"}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Verified vendor</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {responseTime && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {showLabels ? responseTime : "Fast Response"}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Typically responds within {responseTime}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {successRate && successRate > 90 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 flex items-center gap-1">
                <Percent className="w-3 h-3" />
                {showLabels ? `${successRate}% Success` : "High Success"}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{successRate}% success rate on bookings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {customBadges.map((badge, index) => (
        <Badge key={index} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
          <Award className="w-3 h-3" />
          {badge}
        </Badge>
      ))}
    </div>
  );
};

export default VendorTrustSignals;
