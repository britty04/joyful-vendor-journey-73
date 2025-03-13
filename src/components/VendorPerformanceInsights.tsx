
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Star, Users, Calendar, Zap } from 'lucide-react';

interface VendorPerformanceInsightsProps {
  rating: number;
  reviewCount: number;
  successRate: number;
  responseTime: string;
  bookingsCompleted?: number;
}

const VendorPerformanceInsights: React.FC<VendorPerformanceInsightsProps> = ({
  rating,
  reviewCount,
  successRate,
  responseTime,
  bookingsCompleted = 0
}) => {
  // Convert response time to relative speed score
  const getResponseScore = () => {
    if (responseTime.includes('minutes')) return 100;
    if (responseTime === '1 hour') return 85;
    if (responseTime === '2 hours') return 70;
    if (responseTime === '3 hours') return 55;
    return 40;
  };
  
  const responseScore = getResponseScore();

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium text-gray-900">Performance Insights</h3>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium">Rating</span>
            </div>
            <span className="text-sm font-semibold">{rating.toFixed(1)}/5.0</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Progress value={rating * 20} className="h-2" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Based on {reviewCount} reviews</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Response Time</span>
            </div>
            <span className="text-sm font-semibold">{responseTime}</span>
          </div>
          <Progress value={responseScore} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Success Rate</span>
            </div>
            <span className="text-sm font-semibold">{successRate}%</span>
          </div>
          <Progress value={successRate} className="h-2" />
        </div>
        
        {bookingsCompleted > 0 && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Completed Bookings</span>
              </div>
              <span className="text-sm font-semibold">{bookingsCompleted}</span>
            </div>
            <Progress value={Math.min(bookingsCompleted/2, 100)} className="h-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPerformanceInsights;
