
import React from 'react';
import { Button } from '@/components/ui/button';
import VendorCard from '@/components/VendorCard';
import { Vendor } from '@/pages/VendorList';

interface VendorListGridProps {
  vendors: Vendor[];
  getVendorBadges: (vendor: Vendor) => string[];
}

const VendorListGrid = ({ vendors, getVendorBadges }: VendorListGridProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <VendorCard 
            key={vendor.id} 
            vendor={vendor} 
            reviewCount={Math.floor(Math.random() * 50) + 10}
            location="Local Area"
            badges={getVendorBadges(vendor)}
          />
        ))}
      </div>
      {vendors.length > 6 && (
        <div className="text-center mt-8">
          <Button>Load More</Button>
        </div>
      )}
    </>
  );
};

export default VendorListGrid;
