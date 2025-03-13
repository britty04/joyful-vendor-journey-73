
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface QuickAddToCartProps {
  id: string;
  name: string;
  price: number;
  image: string;
  date?: Date;
}

const QuickAddToCart: React.FC<QuickAddToCartProps> = ({ id, name, price, image, date }) => {
  const { addToCart, items } = useCart();
  const isInCart = items.some(item => item.id === id);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      date: date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default to 30 days from now if no date
    });
    
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
    });
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        onClick={handleAddToCart}
        className={`transition-all duration-300 shadow-lg ${
          isInCart ? 'bg-green-500 hover:bg-green-600' : 'bg-eventPurple-500 hover:bg-eventPurple-600'
        } w-full`}
        disabled={isInCart}
        size="lg"
      >
        {isInCart ? (
          <motion.div 
            className="flex items-center"
            initial={{ x: 10 }}
            animate={{ x: 0 }}
          >
            <Check className="mr-2 h-4 w-4" />
            Added to Cart
          </motion.div>
        ) : (
          <motion.div 
            className="flex items-center"
            whileHover={{ x: 5 }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
};

export default QuickAddToCart;
