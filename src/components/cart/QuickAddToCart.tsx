
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

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
    <Button
      onClick={handleAddToCart}
      className={`transition-all duration-300 ${
        isInCart ? 'bg-green-500 hover:bg-green-600' : 'bg-eventPurple-500 hover:bg-eventPurple-600'
      }`}
      disabled={isInCart}
    >
      {isInCart ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
};

export default QuickAddToCart;
