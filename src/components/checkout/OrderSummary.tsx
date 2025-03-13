
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tag, ShieldCheck } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: number;
  date: Date;
  image: string;
  quantity?: number; // Added quantity as optional
}

interface OrderSummaryProps {
  services: Service[];
  totalPrice: number;
  discount: number;
  discountedPrice: number;
  discountCode: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  services, 
  totalPrice, 
  discount, 
  discountedPrice,
  discountCode 
}) => {
  // Calculate tax (assuming 18% GST)
  const taxRate = 0.18;
  const taxAmount = Math.round(discountedPrice * taxRate);
  const finalTotal = discountedPrice + taxAmount;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
        
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className="flex justify-between">
              <span className="text-gray-600">
                {service.name}
                {(service.quantity && service.quantity > 1) ? ` (x${service.quantity})` : ''}
              </span>
              <span>₹{(service.price * (service.quantity || 1)).toLocaleString()}</span>
            </div>
          ))}
          
          <Separator className="my-2" />
          
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          
          {discount > 0 && (
            <>
              <div className="flex justify-between text-green-600">
                <span className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  Discount ({discountCode})
                </span>
                <span>-₹{discount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between font-medium">
                <span>Subtotal after discount</span>
                <span>₹{discountedPrice.toLocaleString()}</span>
              </div>
            </>
          )}
          
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
        
        <div className="mt-6 bg-blue-50 p-3 rounded-md flex gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <div className="text-sm text-blue-700">
            <p className="font-medium">Secure Payment</p>
            <p className="mt-1">Your payment information is encrypted and secure.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
