
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, CreditCard, ArrowRight, CheckCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { PaymentDetails } from './PaymentForm';

interface QuickCheckoutProps {
  onComplete?: () => void;
}

const QuickCheckout: React.FC<QuickCheckoutProps> = ({ onComplete }) => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleQuickCheckout = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Create booking data
      const bookingDetails = {
        orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
        bookingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Event date a week from now
        services: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity
        })),
        venue: "Default Venue",
        paymentMethod: "Quick Checkout (Saved Card)",
        totalAmount: subtotal
      };
      
      // Save to localStorage for persistence
      localStorage.setItem('lastBooking', JSON.stringify(bookingDetails));
      
      toast({
        title: "Order Completed",
        description: "Your order has been processed successfully!",
      });
      
      // Clear cart and notify parent component
      if (onComplete) {
        setTimeout(onComplete, 1500);
      }
      
      // Redirect to success page after showing the success state
      setTimeout(() => {
        clearCart();
        navigate('/booking/success', { state: { bookingDetails } });
      }, 2000);
    }, 1500);
  };

  return (
    <Card className="border-2 border-primary/20 shadow-md hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Quick Checkout</h3>
          </div>
          <span className="text-sm bg-primary/10 text-primary font-medium px-2 py-1 rounded-full">
            Fast & Secure
          </span>
        </div>
        
        <div className="space-y-3 mb-4">
          <p className="text-sm text-gray-600">
            Use your saved payment method and default address for a seamless checkout experience.
          </p>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <div className="mr-3 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Saved Card</p>
              <p className="text-xs text-gray-500">**** **** **** 4567</p>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full gap-2"
          onClick={handleQuickCheckout}
          disabled={isProcessing || isComplete}
        >
          {isProcessing ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </>
          ) : isComplete ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Order Complete!
            </>
          ) : (
            <>
              Checkout Now
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickCheckout;
