
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  price: number;
  date: Date;
  image: string;
}

interface DateReviewProps {
  services: Service[];
}

const DateReview: React.FC<DateReviewProps> = ({ services }) => {
  const [datesMap, setDatesMap] = useState<Map<string, Date>>(
    new Map(services.map(service => [service.id, new Date(service.date)]))
  );

  const handleDateChange = (serviceId: string, date: Date | undefined) => {
    if (date) {
      const newDatesMap = new Map(datesMap);
      newDatesMap.set(serviceId, date);
      setDatesMap(newDatesMap);
      
      toast({
        title: "Date Updated",
        description: `Service date has been updated to ${format(date, 'PPP')}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Policy information */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800">Rescheduling Policy</h4>
            <p className="text-amber-700 text-sm mt-1">
              Rescheduling is free up to 7 days before the event. A fee of 10% applies for changes made within 7 days.
              No rescheduling is allowed within 48 hours of the event.
            </p>
          </div>
        </div>
      </div>
      
      {services.map((service) => {
        const currentDate = datesMap.get(service.id) || service.date;
        
        return (
          <Card key={service.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-gray-500 text-sm">
                    Current date: {format(currentDate, 'PPPP')}
                  </p>
                </div>
                
                <div className="flex items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Change Date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={currentDate}
                        onSelect={(date) => handleDateChange(service.id, date)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Additional info about this specific service date requirements */}
              {service.name.includes('Catering') && (
                <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm flex gap-2">
                  <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-700">
                    Final menu selection must be confirmed at least 3 days before the event date.
                  </p>
                </div>
              )}
              
              {service.name.includes('Photography') && (
                <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm flex gap-2">
                  <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-700">
                    Please note that this photographer is in high demand. Rescheduling may result in limited availability.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
      
      {/* Cancellation policy */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium">Cancellation Policy</h4>
            <p className="text-gray-600 text-sm mt-1">
              Full refund for cancellations made 14 days or more before the event date.
              50% refund for cancellations made between 7-14 days before the event.
              No refund for cancellations within 7 days of the event.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateReview;
