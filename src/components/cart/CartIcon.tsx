
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const CartIcon: React.FC = () => {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <motion.div 
      className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
      onClick={() => navigate('/checkout')}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 flex items-center justify-center bg-eventPurple-500 hover:bg-eventPurple-600 text-white text-xs w-5 h-5 rounded-full"
          variant="default"
        >
          {itemCount > 9 ? '9+' : itemCount}
        </Badge>
      )}
    </motion.div>
  );
};

export default CartIcon;
