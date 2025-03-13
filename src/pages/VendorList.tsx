
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import VendorCard from '../components/VendorCard';
import { Filter, ChevronDown, Search, MapPin, ArrowUpDown, X } from 'lucide-react';

// Sample vendor data (in a real app this would come from an API)
const allVendors = [
  {
    id: 'v1',
    name: 'Magic Mike Entertainment',
    category: 'Magician',
    rating: 4.9,
    reviewCount: 124,
    location: 'Mumbai, Maharashtra',
    image: 'https://images.unsplash.com/photo-1616187415606-e04f936152b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '₹7,500',
    badges: ['Top Rated', 'Featured']
  },
  {
    id: 'v2',
    name: 'Balloon Wonderland',
    category: 'Decorator',
    rating: 4.7,
    reviewCount: 89,
    location: 'Delhi, NCR',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '₹12,000',
    badges: ['Popular']
  },
  {
    id: 'v3',
    name: 'Kiddie Delights Catering',
    category: 'Catering',
    rating: 4.8,
    reviewCount: 112,
    location: 'Bangalore, Karnataka',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '₹350',
    badges: ['Kids Favorite']
  },
  {
    id: 'v4',
    name: 'Capture the Moment',
    category: 'Photographer',
    rating: 4.6,
    reviewCount: 73,
    location: 'Chennai, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '₹15,000',
    badges: []
  },
  {
    id: 'v5',
    name: 'Party Palace',
    category: 'Venue',
    rating: 4.5,
    reviewCount: 62,
    location: 'Hyderabad, Telangana',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '₹25,000',
    badges: ['Verified']
  },
  {
    id: 'v6',
    name: 'Fun Games Rental',
    category: 'Game Rental',
    rating: 4.8,
    reviewCount: 94,
    location: 'Pune, Maharashtra',
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '₹8,000',
    badges: ['Best Value']
  },
  {
    id: 'v7',
    name: 'Birthday Bash Planners',
    category: 'Event Planner',
    rating: 4.7,
    reviewCount: 85,
    location: 'Kolkata, West Bengal',
    image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '₹20,000',
    badges: ['Full Service']
  },
  {
    id: 'v8',
    name: 'Sweet Treats Bakery',
    category: 'Bakery',
    rating: 4.9,
    reviewCount: 156,
    location: 'Ahmedabad, Gujarat',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '₹800',
    badges: ['Customized']
  },
  {
    id: 'v9',
    name: 'Clown Around Entertainment',
    category: 'Entertainer',
    rating: 4.6,
    reviewCount: 67,
    location: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '₹5,000',
    badges: []
  }
];

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'magician', name: 'Magicians' },
  { id: 'decorator', name: 'Decorators' },
  { id: 'catering', name: 'Catering' },
  { id: 'photographer', name: 'Photographers' },
  { id: 'venue', name: 'Venues' },
  { id: 'game-rental', name: 'Game Rentals' },
  { id: 'planner', name: 'Event Planners' },
  { id: 'bakery', name: 'Bakeries' },
  { id: 'entertainer', name: 'Entertainers' }
];

const locations = [
  { id: 'all', name: 'All Locations' },
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'delhi', name: 'Delhi NCR' },
  { id: 'bangalore', name: 'Bangalore' },
  { id: 'chennai', name: 'Chennai' },
  { id: 'hyderabad', name: 'Hyderabad' },
  { id: 'pune', name: 'Pune' },
  { id: 'kolkata', name: 'Kolkata' },
  { id: 'jaipur', name: 'Jaipur' }
];

const VendorList = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [vendors, setVendors] = useState(allVendors);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('recommended');
  
  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const locationParam = searchParams.get('location') || 'all';
    const search = searchParams.get('search') || '';
    const rating = parseInt(searchParams.get('rating') || '0');
    const sort = searchParams.get('sort') || 'recommended';
    
    setSelectedCategory(category);
    setSelectedLocation(locationParam);
    setSearchQuery(search);
    setSelectedRating(rating);
    setSortBy(sort);
    
    // Apply filters
    filterVendors(category, locationParam, search, rating, sort);
  }, [location.search]);
  
  const filterVendors = (category: string, location: string, search: string, rating: number, sort: string) => {
    let filtered = [...allVendors];
    
    // Apply category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(vendor => 
        vendor.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    // Apply location filter
    if (location && location !== 'all') {
      filtered = filtered.filter(vendor => 
        vendor.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    // Apply search filter
    if (search) {
      filtered = filtered.filter(vendor => 
        vendor.name.toLowerCase().includes(search.toLowerCase()) ||
        vendor.category.toLowerCase().includes(search.toLowerCase()) ||
        vendor.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (rating > 0) {
      filtered = filtered.filter(vendor => vendor.rating >= rating);
    }
    
    // Apply sorting
    if (sort === 'price-low') {
      filtered = filtered.sort((a, b) => 
        parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''))
      );
    } else if (sort === 'price-high') {
      filtered = filtered.sort((a, b) => 
        parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''))
      );
    } else if (sort === 'rating') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }
    
    setVendors(filtered);
  };
  
  const applyFilters = () => {
    // Update URL params
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedLocation !== 'all') params.set('location', selectedLocation);
    if (searchQuery) params.set('search', searchQuery);
    if (selectedRating > 0) params.set('rating', selectedRating.toString());
    if (sortBy !== 'recommended') params.set('sort', sortBy);
    
    setSearchParams(params);
    
    // Apply filters
    filterVendors(selectedCategory, selectedLocation, searchQuery, selectedRating, sortBy);
    
    // Close mobile filter panel
    setIsFilterOpen(false);
  };
  
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSearchQuery('');
    setSelectedRating(0);
    setPriceRange([0, 50000]);
    setSortBy('recommended');
    
    setSearchParams({});
    setVendors(allVendors);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="pt-8 pb-6 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Find Vendors</h1>
                <p className="text-gray-600">
                  {vendors.length} vendors available for your event
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="relative w-full md:w-auto mr-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Search vendors..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>
                
                <button
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center text-gray-700 hover:bg-gray-50 md:hidden"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter size={18} className="mr-2" />
                  Filters
                </button>
              </div>
            </div>
            
            {/* Desktop Filters */}
            <div className="hidden md:flex items-center space-x-4 mt-6">
              {/* Category Filter */}
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
              
              {/* Location Filter */}
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
              
              {/* Rating Filter */}
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                >
                  <option value="0">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="5">5 Stars</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
              
              {/* Sort By */}
              <div className="relative ml-auto">
                <select
                  className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ArrowUpDown size={16} className="text-gray-400" />
                </div>
              </div>
              
              {/* Apply Filters */}
              <button
                className="bg-primary text-white rounded-lg px-4 py-2 font-medium hover:bg-primary/90 transition-colors"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
              
              {/* Reset Filters */}
              <button
                className="bg-white text-gray-700 rounded-lg px-4 py-2 border border-gray-200 font-medium hover:bg-gray-50 transition-colors"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
            
            {/* Active Filters */}
            {(selectedCategory !== 'all' || selectedLocation !== 'all' || selectedRating > 0 || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {selectedCategory !== 'all' && (
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                    Category: {categories.find(c => c.id === selectedCategory)?.name}
                    <button
                      className="ml-2"
                      onClick={() => {
                        setSelectedCategory('all');
                        applyFilters();
                      }}
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {selectedLocation !== 'all' && (
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                    Location: {locations.find(l => l.id === selectedLocation)?.name}
                    <button
                      className="ml-2"
                      onClick={() => {
                        setSelectedLocation('all');
                        applyFilters();
                      }}
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {selectedRating > 0 && (
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                    {selectedRating}+ Stars
                    <button
                      className="ml-2"
                      onClick={() => {
                        setSelectedRating(0);
                        applyFilters();
                      }}
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {searchQuery && (
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                    Search: {searchQuery}
                    <button
                      className="ml-2"
                      onClick={() => {
                        setSearchQuery('');
                        applyFilters();
                      }}
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                <button
                  className="text-primary text-sm hover:underline"
                  onClick={resetFilters}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Filters Panel */}
        {isFilterOpen && (
          <div className="md:hidden bg-white border-b shadow-sm animate-slide-down">
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full border border-gray-200 rounded-lg p-2"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  className="w-full border border-gray-200 rounded-lg p-2"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  className="w-full border border-gray-200 rounded-lg p-2"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                >
                  <option value="0">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  className="w-full border border-gray-200 rounded-lg p-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              
              <div className="flex space-x-2">
                <button
                  className="flex-1 bg-primary text-white rounded-lg py-2 font-medium hover:bg-primary/90 transition-colors"
                  onClick={applyFilters}
                >
                  Apply Filters
                </button>
                
                <button
                  className="flex-1 bg-white text-gray-700 rounded-lg py-2 border border-gray-200 font-medium hover:bg-gray-50 transition-colors"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Vendor Results */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {vendors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map((vendor) => (
                <VendorCard key={vendor.id} {...vendor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">No vendors found</h2>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <button
                className="bg-primary text-white rounded-lg px-6 py-2 font-medium hover:bg-primary/90 transition-colors"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default VendorList;
