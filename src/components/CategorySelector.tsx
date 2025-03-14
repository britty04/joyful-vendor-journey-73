
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  emoji: string;
  eventType?: string;
}

const categories: Category[] = [
  {
    id: 'entertainers',
    name: 'Entertainers',
    icon: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-eventPurple-500 to-eventPink-500',
    emoji: '🎭',
    eventType: 'kids'
  },
  {
    id: 'decorators',
    name: 'Wedding Decor',
    icon: 'https://images.unsplash.com/photo-1546173159-315724a31696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-eventGreen-500 to-eventBlue-500',
    emoji: '💐',
    eventType: 'wedding'
  },
  {
    id: 'catering',
    name: 'Catering',
    icon: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-eventPink-500 to-eventYellow-500',
    emoji: '🍰'
  },
  {
    id: 'photographers',
    name: 'Photography',
    icon: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-eventYellow-400 to-eventYellow-600',
    emoji: '📸',
    eventType: 'wedding'
  },
  {
    id: 'venues',
    name: 'Venues',
    icon: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-eventBlue-500 to-eventBlue-600',
    emoji: '🏰'
  },
  {
    id: 'makeup',
    name: 'Bridal Makeup',
    icon: 'https://images.unsplash.com/photo-1487412840807-a91612003d50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-eventPink-400 to-eventPink-600',
    emoji: '💄',
    eventType: 'wedding'
  },
  {
    id: 'mehendi',
    name: 'Mehendi Artists',
    icon: 'https://images.unsplash.com/photo-1532886446204-2d0a3b0fa6e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-eventGreen-400 to-eventGreen-600',
    emoji: '🌿',
    eventType: 'wedding'
  },
  {
    id: 'tickets',
    name: 'Ticketed Events',
    icon: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-eventPurple-600 to-eventPurple-700',
    emoji: '🎟️'
  }
];

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-purple-50/50 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 mb-3 bg-purple-100 rounded-full text-purple-700">
            <Sparkles size={16} className="mr-2 text-eventPurple-500" />
            <span className="text-sm font-medium">Find what you need</span>
          </div>
          <h2 className="font-bold text-gray-900 mb-2 text-2xl md:text-3xl">
            <span className="gradient-text-purple">Browse By Category</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.id === 'tickets' ? '/ticketing-events' : 
                 `/vendors?category=${category.id}${category.eventType ? `&event=${category.eventType}` : ''}`}
              className="group"
              onMouseEnter={() => setSelectedCategory(category.id)}
              onMouseLeave={() => setSelectedCategory(null)}
            >
              <div className="relative rounded-xl overflow-hidden aspect-square transition-all duration-300 group-hover:scale-105 shadow-md group-hover:shadow-lg">
                {/* Category Background Image */}
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${category.color} opacity-80 transition-opacity duration-300 group-hover:opacity-90`}></div>
                
                {/* Emoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl filter drop-shadow-md mb-6 transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{category.emoji}</span>
                </div>
                
                {/* Category Name */}
                <div className="absolute inset-x-0 bottom-0 text-white p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="font-semibold text-center text-sm block">{category.name}</span>
                </div>
                
                {/* Hover Effect */}
                {selectedCategory === category.id && (
                  <motion.div 
                    className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span 
                      className="bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-medium shadow-md"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      View {category.id === 'tickets' ? 'Events' : 'Vendors'}
                    </motion.span>
                  </motion.div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySelector;
