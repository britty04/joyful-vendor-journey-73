
import { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  // Get location from Navbar state or localStorage if available
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(() => {
    return localStorage.getItem('userLocation') || 'New York';
  });
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('');
  const navigate = useNavigate();

  // Save location to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userLocation', location);
  }, [location]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (location) params.append('location', location);
    if (eventDate) params.append('date', eventDate);
    if (eventType) params.append('event', eventType);
    
    navigate(`/vendors?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-24 lg:py-28">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-eventPurple-100 to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-eventPink-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-eventPurple-200 rounded-full opacity-20 blur-3xl"></div>
        
        {/* Animated shapes */}
        <div className="absolute top-1/4 left-10 w-6 h-6 bg-eventYellow-400 rounded-full opacity-40 animate-float"></div>
        <div className="absolute top-1/3 right-10 w-4 h-4 bg-eventPink-400 rounded-full opacity-30 animate-bounce-gentle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-eventPurple-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-slide-down">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-purple-100 rounded-full text-purple-700">
              <Sparkles size={18} className="mr-2 text-eventPurple-500" />
              <span className="text-sm font-medium">Magic moments for your little ones</span>
            </div>
            <h1 className="font-bold text-gray-900 mb-6">
              <span className="block">Discover Perfect Vendors</span>
              <span className="block mt-2 gradient-text">For Unforgettable Events</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Find, compare, and book amazing event vendors – all in one place. 
              AI-powered recommendations tailored to your event's needs.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="playful-card playful-shadow p-2 transition-all">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-100">
                  <div className="flex items-center p-4">
                    <Search className="h-5 w-5 text-gray-400 mr-3" />
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-100">
                  <div className="flex items-center p-4">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-gray-700 appearance-none cursor-pointer"
                    >
                      <option value="New York">New York</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Chicago">Chicago</option>
                      <option value="Miami">Miami</option>
                      <option value="Dallas">Dallas</option>
                    </select>
                  </div>
                </div>
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-100">
                  <div className="flex items-center p-4">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <input
                      type="text"
                      placeholder="Event Date"
                      className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2">
                  <button 
                    className="w-full playful-button"
                    onClick={handleSearch}
                  >
                    <span>Search</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Event Type Shortcuts */}
            <div className="mt-4 flex items-center justify-center flex-wrap gap-2 text-sm text-gray-600">
              <span>Quick search:</span>
              <button 
                onClick={() => {
                  setEventType('kids');
                  handleSearch();
                }}
                className="px-3 py-1 bg-white hover:bg-purple-50 rounded-full border border-purple-100 transition-colors"
              >
                Kids Events
              </button>
              <button 
                onClick={() => {
                  setEventType('corporate');
                  handleSearch();
                }}
                className="px-3 py-1 bg-white hover:bg-purple-50 rounded-full border border-purple-100 transition-colors"
              >
                Corporate Events
              </button>
              <button 
                onClick={() => {
                  setEventType('wedding');
                  handleSearch();
                }}
                className="px-3 py-1 bg-white hover:bg-purple-50 rounded-full border border-purple-100 transition-colors"
              >
                Weddings
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-purple-200 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-primary rounded-full animate-[slide-down_1.5s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
