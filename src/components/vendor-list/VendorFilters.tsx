
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';

interface VendorFiltersProps {
  categoryParam: string | null;
  eventParam: string | null;
  vendorCount: number;
  pageTitle: string;
}

const VendorFilters = ({ categoryParam, eventParam, vendorCount, pageTitle }: VendorFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
        <div className="flex items-center">
          <p className="text-gray-600">{vendorCount} vendors available</p>
          {eventParam && (
            <Badge variant="outline" className="ml-2 bg-gray-100">
              {eventParam.charAt(0).toUpperCase() + eventParam.slice(1)}
            </Badge>
          )}
          {categoryParam && (
            <Badge variant="outline" className="ml-2 bg-gray-100">
              {categoryParam}
            </Badge>
          )}
        </div>
      </div>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <Filter size={16} />
        Filter
      </Button>
    </div>
  );
};

export default VendorFilters;
