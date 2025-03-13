
import { useState } from 'react';
import VendorCard from './VendorCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample vendor data
const vendors = [
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
  }
];

const FeaturedVendors = () => {
  const [activeTab, setActiveTab] = useState('trending');

  const tabs = [
    { id: 'trending', label: 'Trending' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'best-rated', label: 'Best Rated' }
  ];

  // In a real app, you'd filter vendors based on activeTab
  const displayedVendors = vendors;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12">
          <div>
            <h2 className="font-bold text-gray-900 mb-2">Featured Vendors</h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our hand-picked selection of top-rated vendors for children's events.
            </p>
          </div>

          {/* Category tabs for desktop */}
          <div className="hidden md:flex space-x-2 bg-white p-1 rounded-full shadow-sm border border-gray-100 mt-4 md:mt-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category tabs for mobile (scrollable) */}
          <div className="md:hidden mt-6 flex overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-100'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedVendors.map((vendor) => (
            <VendorCard 
              key={vendor.id}
              vendor={{
                id: vendor.id,
                name: vendor.name,
                category: vendor.category,
                description: `${vendor.name} provides excellent ${vendor.category.toLowerCase()} services`,
                image: vendor.image,
                rating: vendor.rating,
                price: parseFloat(vendor.price.replace(/[^\d.]/g, '')),
              }}
              reviewCount={vendor.reviewCount}
              location={vendor.location}
              badges={vendor.badges}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <a
            href="/vendors"
            className="inline-flex items-center rounded-full bg-white px-6 py-3 text-base font-medium text-primary shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            View All Vendors
            <ChevronRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;
