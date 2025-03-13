
import React from 'react';
import VendorCard from '@/components/VendorCard';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  location?: string;
  badges?: string[];
  reviewCount?: number;
  available?: boolean;
}

interface SearchResultsProps {
  results: Vendor[];
  isLoading?: boolean;
  error?: string | null;
  onSortChange?: (sortOption: string) => void;
  currentSort?: string;
  totalResults?: number;
  loadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading = false,
  error = null,
  onSortChange,
  currentSort = 'relevance',
  totalResults = 0,
  loadMore,
  hasMore = false,
  isLoadingMore = false
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Searching for perfect matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center my-8">
        <p className="text-red-600">{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center my-8">
        <h3 className="text-xl font-medium mb-2">No results found</h3>
        <p className="text-muted-foreground mb-6">
          We couldn't find any vendors matching your search criteria.
        </p>
        <Button variant="outline" onClick={() => window.location.href = '/vendors'}>
          View All Vendors
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          {totalResults > 0 ? `${totalResults} results found` : `${results.length} results found`}
        </p>
        
        {onSortChange && (
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Select value={currentSort} onValueChange={onSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="popularity">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((vendor) => (
          <VendorCard 
            key={vendor.id}
            vendor={{
              id: vendor.id,
              name: vendor.name,
              category: vendor.category,
              description: vendor.description,
              image: vendor.image,
              rating: vendor.rating,
              price: vendor.price,
            }}
            reviewCount={vendor.reviewCount || 0}
            location={vendor.location || ''}
            badges={vendor.badges || []}
          />
        ))}
      </div>
      
      {hasMore && loadMore && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={loadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
