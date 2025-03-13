
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutWithTerms from '@/components/LayoutWithTerms';
import CheckoutFlow from '@/components/checkout/CheckoutFlow';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const Checkout = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Check if cart is empty
  const isCartEmpty = items.length === 0 && !isOrderPlaced;

  // Handle order completion
  const handleOrderComplete = () => {
    // In a real app, you would process payment, save order to database, etc.
    setIsOrderPlaced(true);
    clearCart();
    
    // Reset order status after some time (for demo purposes)
    setTimeout(() => {
      setIsOrderPlaced(false);
    }, 60000); // Reset after 60 seconds
  };

  // If user completes checkout and goes back, ensure they don't see empty state
  useEffect(() => {
    if (isOrderPlaced) {
      window.history.pushState(null, '', '/checkout/complete');
    }
  }, [isOrderPlaced]);

  return (
    <LayoutWithTerms>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">
          {isOrderPlaced ? 'Order Complete!' : 'Checkout'}
        </h1>
        
        {isCartEmpty ? (
          <div className="flex flex-col items-center py-16">
            <div className="bg-gray-50 p-8 rounded-full mb-6">
              <ShoppingBag className="w-16 h-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 text-center max-w-md">
              Looks like you haven't added any services to your cart yet. 
              Explore our services to find the perfect match for your event.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/guided-booking')}
              className="px-8"
            >
              Try AI Guided Booking
            </Button>
          </div>
        ) : isOrderPlaced ? (
          <div className="text-center py-12 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You For Your Order!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Your order has been placed successfully. You will receive an email confirmation shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/')}>
                Return Home
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/guided-booking')}
              >
                Book Another Event
              </Button>
            </div>
          </div>
        ) : (
          <CheckoutFlow onOrderComplete={handleOrderComplete} />
        )}
      </div>
    </LayoutWithTerms>
  );
};

export default Checkout;
