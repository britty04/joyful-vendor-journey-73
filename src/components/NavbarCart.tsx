
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import CartIcon from './cart/CartIcon';
import UserAuthNav from './UserAuthNav';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const NavbarCart = () => {
  const { items, updateQuantity, removeFromCart, subtotal, itemCount } = useCart();
  const [open, setOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="flex items-center space-x-4">
      <Link to="/services" className="text-gray-700 hover:text-primary transition-colors">
        Services
      </Link>
      <Link to="/events" className="text-gray-700 hover:text-primary transition-colors">
        Events
      </Link>
      <Link to="/guided-booking" className="text-gray-700 hover:text-primary transition-colors">
        AI Booking
      </Link>
      <Link to="/vendors" className="text-gray-700 hover:text-primary transition-colors">
        Vendors
      </Link>
      <div className="border-l h-6 mx-1 border-gray-300"></div>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors" 
            size="icon"
            aria-label="Shopping cart"
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
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="p-4 border-b border-gray-100">
            <div className="font-medium">Your Cart</div>
            <div className="text-sm text-muted-foreground">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
            </div>
          </div>
          
          {items.length === 0 ? (
            <div className="p-8 text-center">
              <ShoppingBag className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-medium mb-1">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add items to your cart to see them here
              </p>
              <Button asChild onClick={() => setOpen(false)}>
                <Link to="/services">Browse Services</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="max-h-80 overflow-auto p-0">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center p-4 border-b border-gray-100">
                    <div 
                      className="w-12 h-12 rounded bg-cover bg-center mr-3 flex-shrink-0"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatPrice(item.price)} × {item.quantity}
                      </div>
                    </div>
                    <div className="flex items-center ml-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 ml-1" 
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <Button asChild className="w-full bg-eventPurple-500 hover:bg-eventPurple-600 mt-2">
                  <Link to="/checkout" onClick={() => setOpen(false)}>
                    Checkout
                  </Link>
                </Button>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
      
      <UserAuthNav />
    </div>
  );
};

export default NavbarCart;
