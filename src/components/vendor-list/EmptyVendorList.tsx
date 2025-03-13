
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

const EmptyVendorList = () => {
  return (
    <div className="text-center py-20 bg-gray-50 rounded-lg">
      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">No vendors found</h2>
      <p className="text-gray-500 mb-8">Try adjusting your filters or browse all vendors</p>
      <Button asChild>
        <a href="/vendors">View All Vendors</a>
      </Button>
    </div>
  );
};

export default EmptyVendorList;
