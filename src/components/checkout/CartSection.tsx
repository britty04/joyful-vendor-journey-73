
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, MinusCircle, PlusCircle, CreditCard, WalletCards, IndianRupee } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Service {
  id: string;
  name: string;
  price: number;
  date: Date;
  image: string;
  quantity: number;
}

interface PaymentOption {
  id: string;
  name: string;
  type: 'card' | 'upi' | 'cash';
  details?: string;
  icon: React.ReactNode;
}

interface CartSectionProps {
  services: Service[];
  onUpdateQuantity: (serviceId: string, newQuantity: number) => void;
  onRemoveService: (serviceId: string) => void;
  onSelectPaymentMethod: (methodId: string) => void;
  selectedMethod: string | null;
}

const paymentOptions: PaymentOption[] = [
  { 
    id: 'card1', 
    name: 'Credit/Debit Card', 
    type: 'card',
    details: '**** **** **** 4567',
    icon: <CreditCard className="w-5 h-5" />
  },
  { 
    id: 'upi1', 
    name: 'UPI Payment', 
    type: 'upi',
    details: 'user@okbank',
    icon: <WalletCards className="w-5 h-5" />
  },
  { 
    id: 'cash1', 
    name: 'Cash on Delivery', 
    type: 'cash',
    icon: <IndianRupee className="w-5 h-5" />
  }
];

const CartSection: React.FC<CartSectionProps> = ({
  services,
  onUpdateQuantity,
  onRemoveService,
  onSelectPaymentMethod,
  selectedMethod
}) => {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  
  const calculateSubtotal = () => {
    return services.reduce((total, service) => total + (service.price * service.quantity), 0);
  };
  
  const subtotal = calculateSubtotal();
  const taxRate = 0.18; // 18% GST
  const taxAmount = Math.round(subtotal * taxRate);
  const finalTotal = subtotal + taxAmount;

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Your Cart</h2>
        </div>
        
        {services.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
            <Button variant="outline" className="mt-4">
              Browse Services
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {services.map((service) => (
                <div key={service.id} className="flex gap-4 border-b pb-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{service.name}</h3>
                      <button 
                        onClick={() => onRemoveService(service.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className="text-primary font-semibold mt-1">
                      ₹{service.price.toLocaleString()}
                    </p>
                    
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => service.quantity > 1 && onUpdateQuantity(service.id, service.quantity - 1)}
                        className="text-gray-500 hover:text-primary disabled:opacity-50"
                        disabled={service.quantity <= 1}
                      >
                        <MinusCircle className="w-5 h-5" />
                      </button>
                      <span className="mx-3 min-w-8 text-center">{service.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(service.id, service.quantity + 1)}
                        className="text-gray-500 hover:text-primary"
                      >
                        <PlusCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span>₹{taxAmount.toLocaleString()}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                className="w-full"
              >
                {showPaymentOptions ? 'Hide Payment Options' : 'Proceed to Payment'}
              </Button>
            </div>
            
            {showPaymentOptions && (
              <div className="mt-6">
                <h3 className="font-medium mb-4">Select Payment Method</h3>
                <RadioGroup 
                  value={selectedMethod || undefined} 
                  onValueChange={onSelectPaymentMethod}
                  className="space-y-3"
                >
                  {paymentOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:border-primary transition-colors">
                      <RadioGroupItem 
                        value={option.id} 
                        id={`payment-${option.id}`} 
                      />
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <div className="mr-2 text-gray-600">
                            {option.icon}
                          </div>
                          <Label 
                            htmlFor={`payment-${option.id}`}
                            className="font-medium cursor-pointer"
                          >
                            {option.name}
                          </Label>
                        </div>
                        
                        {option.details && (
                          <p className="text-gray-600 text-sm ml-7">{option.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                
                <div className="mt-4">
                  <Button 
                    className="w-full" 
                    disabled={!selectedMethod}
                  >
                    Complete Payment
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CartSection;
