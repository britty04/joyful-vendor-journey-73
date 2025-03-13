
import { useState } from 'react';
import { Search, Calendar, MapPin, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-eventBlue-100 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-eventPurple-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-20 md:pb-32 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-slide-down">
            <h1 className="font-bold text-gray-900 mb-6">
              <span className="block">Discover Perfect Vendors</span>
              <span className="block mt-2 gradient-text">For Unforgettable Kids' Events</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Find, compare, and book amazing event vendors – all in one place. 
              AI-powered recommendations tailored to your event's needs.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative max-w-4xl mx-auto animate-slide-up animation-delay-300">
            <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200">
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
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200">
                  <div className="flex items-center p-4">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200">
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
                  <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-95">
                    <span>Search</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Popular Searches */}
            <div className="mt-4 flex items-center justify-center flex-wrap gap-2 text-sm text-gray-600">
              <span>Popular:</span>
              <button className="px-3 py-1 bg-white/60 hover:bg-white rounded-full border border-gray-200 transition-colors">
                Birthday Magicians
              </button>
              <button className="px-3 py-1 bg-white/60 hover:bg-white rounded-full border border-gray-200 transition-colors">
                Balloon Decorators
              </button>
              <button className="px-3 py-1 bg-white/60 hover:bg-white rounded-full border border-gray-200 transition-colors">
                Kids Catering
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-gray-400 rounded-full animate-[slide-down_1.5s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
