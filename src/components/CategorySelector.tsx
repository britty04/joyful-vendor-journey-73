
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const categories: Category[] = [
  {
    id: 'entertainers',
    name: 'Entertainers',
    icon: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'decorators',
    name: 'Decorators',
    icon: 'https://images.unsplash.com/photo-1546173159-315724a31696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'catering',
    name: 'Catering',
    icon: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-orange-500 to-pink-500'
  },
  {
    id: 'photographers',
    name: 'Photographers',
    icon: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'venues',
    name: 'Venues',
    icon: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'game-rentals',
    name: 'Game Rentals',
    icon: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'from-purple-500 to-violet-500'
  }
];

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-bold text-gray-900 mb-4">Browse By Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect vendor for your child's special day. We've curated the best vendors across all categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/vendors?category=${category.id}`}
              className="group"
              onMouseEnter={() => setSelectedCategory(category.id)}
              onMouseLeave={() => setSelectedCategory(null)}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-square transition-transform duration-300 group-hover:scale-105 shadow-sm group-hover:shadow-md">
                {/* Category Background Image */}
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${category.color} opacity-80 transition-opacity duration-300 group-hover:opacity-90`}></div>
                
                {/* Category Name */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <span className="font-semibold text-center">{category.name}</span>
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
                      className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium"
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
