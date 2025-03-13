
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
}

const categories: Category[] = [
  {
    id: 'entertainers',
    name: 'Entertainers',
    icon: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-eventPurple-500 to-eventPink-500',
    emoji: '🎭'
  },
  {
    id: 'decorators',
    name: 'Decorators',
    icon: 'https://images.unsplash.com/photo-1546173159-315724a31696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-eventGreen-500 to-eventBlue-500',
    emoji: '🎈'
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
    name: 'Photographers',
    icon: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-eventYellow-400 to-eventYellow-600',
    emoji: '📸'
  },
  {
    id: 'venues',
    name: 'Venues',
    icon: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-eventBlue-500 to-eventBlue-600',
    emoji: '🏰'
  },
  {
    id: 'game-rentals',
    name: 'Game Rentals',
    icon: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-eventPurple-600 to-eventPurple-700',
    emoji: '🎮'
  }
];

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-purple-50/50 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 mb-5 bg-purple-100 rounded-full text-purple-700">
            <Sparkles size={16} className="mr-2 text-eventPurple-500" />
            <span className="text-sm font-medium">Find what you need</span>
          </div>
          <h2 className="font-bold text-gray-900 mb-4">Browse By Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect vendor for your child's special day. We've curated the best vendors across all categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/vendors?category=${category.id}`}
              className="group"
              onMouseEnter={() => setSelectedCategory(category.id)}
              onMouseLeave={() => setSelectedCategory(null)}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-square transition-all duration-300 group-hover:scale-105 shadow-md group-hover:shadow-lg">
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
                <div className="absolute inset-x-0 bottom-0 text-white p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="font-semibold text-center block">{category.name}</span>
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
                      className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-md"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      View Vendors
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
