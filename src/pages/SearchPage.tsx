
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import SearchBar from '@/components/search/SearchBar';
import SearchFilters from '@/components/search/SearchFilters';
import SearchResults, { Vendor } from '@/components/search/SearchResults';
import { Loader2 } from 'lucide-react';

// Mock data - in a real app, this would come from an API
import { vendors } from '@/mocks/vendors';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<Vendor[]>([]);
  const [filteredResults, setFilteredResults] = useState<Vendor[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('relevance');
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Get query parameters
  const query = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const event = searchParams.get('event') || '';
  
  // Initial filters based on URL parameters
  const initialFilters = {
    categories: category ? [category] : [],
    priceRange: { min: 1000, max: 50000 },
    rating: null,
    location: null,
    availability: false
  };

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter vendors based on search query and category
      let filtered = [...vendors];
      
      if (query) {
        const searchLower = query.toLowerCase();
        filtered = filtered.filter(vendor => 
          vendor.name.toLowerCase().includes(searchLower) || 
          vendor.category.toLowerCase().includes(searchLower) ||
          (vendor.description && vendor.description.toLowerCase().includes(searchLower))
        );
      }
      
      if (category) {
        filtered = filtered.filter(vendor => 
          vendor.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      if (event) {
        // This is a simple mock implementation
        // In a real app, you would have proper event type filtering
        if (event === 'kids') {
          filtered = filtered.filter(vendor => 
            vendor.category === 'Magician' || 
            vendor.category === 'Game Rental' ||
            vendor.name.toLowerCase().includes('kid') ||
            (vendor.description && vendor.description.toLowerCase().includes('kid'))
          );
        } else if (event === 'wedding') {
          filtered = filtered.filter(vendor => 
            vendor.category === 'Decorator' || 
            vendor.category === 'Photographer' ||
            vendor.category === 'Venue'
          );
        }
      }
      
      setResults(filtered);
      setFilteredResults(filtered.slice(0, 9)); // Show first 9 results
      setTotalResults(filtered.length);
      setHasMore(filtered.length > 9);
      setIsLoading(false);
    };
    
    fetchData();
  }, [query, category, event]);
  
  const handleSearch = (newQuery: string) => {
    // Update URL parameters and trigger the useEffect
    const newParams = new URLSearchParams(searchParams);
    newParams.set('search', newQuery);
    setSearchParams(newParams);
  };
  
  const handleFilterChange = (filters: {
    categories: string[];
    priceRange: { min: number; max: number };
    rating: number | null;
    location: string | null;
    availability: boolean;
  }) => {
    // Apply filters to the results
    let filtered = [...results];
    
    // Filter by categories if any are selected
    if (filters.categories.length > 0) {
      filtered = filtered.filter(vendor => 
        filters.categories.includes(vendor.category.toLowerCase())
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(vendor => 
      vendor.price >= filters.priceRange.min && 
      vendor.price <= filters.priceRange.max
    );
    
    // Filter by rating
    if (filters.rating !== null) {
      filtered = filtered.filter(vendor => vendor.rating >= filters.rating!);
    }
    
    // Filter by location
    if (filters.location !== null) {
      filtered = filtered.filter(vendor => 
        vendor.location && vendor.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    // Filter by availability
    if (filters.availability) {
      filtered = filtered.filter(vendor => vendor.available !== false);
    }
    
    // Update URL with category filter if needed
    if (filters.categories.length === 1 && (!category || filters.categories[0] !== category)) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('category', filters.categories[0]);
      setSearchParams(newParams);
    } else if (filters.categories.length === 0 && category) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('category');
      setSearchParams(newParams);
    }
    
    setFilteredResults(filtered.slice(0, currentPage * 9));
    setTotalResults(filtered.length);
    setHasMore(filtered.length > currentPage * 9);
  };
  
  const handleSortChange = (option: string) => {
    setSortOption(option);
    let sorted = [...filteredResults];
    
    switch (option) {
      case 'price_low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        // In a real app, you would sort by actual popularity metrics
        sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      default:
        // 'relevance' - no additional sorting needed as it's already sorted by relevance
        break;
    }
    
    setFilteredResults(sorted);
  };
  
  const loadMoreResults = async () => {
    setIsLoadingMore(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const nextPage = currentPage + 1;
    setFilteredResults(results.slice(0, nextPage * 9));
    setCurrentPage(nextPage);
    setHasMore(results.length > nextPage * 9);
    setIsLoadingMore(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 max-w-3xl mx-auto">
          <SearchBar 
            onSearch={handleSearch}
            placeholder={query || "Search..."}
            className="mb-4"
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-1/4 lg:w-1/5">
            <SearchFilters 
              onFilterChange={handleFilterChange}
              initialFilters={initialFilters}
              className="sticky top-24"
            />
          </aside>
          
          <main className="md:w-3/4 lg:w-4/5">
            <SearchResults 
              results={filteredResults}
              isLoading={isLoading}
              error={null}
              onSortChange={handleSortChange}
              currentSort={sortOption}
              totalResults={totalResults}
              loadMore={loadMoreResults}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
            />
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
