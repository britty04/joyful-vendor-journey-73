
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tag, ShieldCheck, Gift, CreditCard, TrendingUp } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: number;
  date: Date;
  image: string;
  quantity?: number;
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
    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden sticky top-6">
      <div className="bg-gradient-to-r from-primary to-purple-600 py-4 px-6">
        <h3 className="font-bold text-xl text-white">Order Summary</h3>
      </div>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="flex justify-between items-center">
              <div className="flex-1">
                <span className="text-gray-800 font-medium">
                  {service.name}
                  {(service.quantity && service.quantity > 1) ? ` (x${service.quantity})` : ''}
                </span>
              </div>
              <span className="font-medium">₹{(service.price * (service.quantity || 1)).toLocaleString()}</span>
            </div>
          ))}
        </div>
        
        <Separator className="my-2" />
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
          </div>
          
          {discount > 0 && (
            <div className="bg-green-50 rounded-xl p-3">
              <div className="flex justify-between text-green-600 items-center">
                <span className="flex items-center">
                  <Gift className="w-4 h-4 mr-2" />
                  <span className="font-medium">Discount Applied!</span>
                </span>
                <span className="font-medium">-₹{discount.toLocaleString()}</span>
              </div>
              <div className="mt-1 pl-6 text-sm text-green-600">
                Code: <span className="font-mono bg-green-100 px-2 py-0.5 rounded">{discountCode}</span>
              </div>
              <div className="flex justify-between font-medium mt-2">
                <span>Subtotal after discount</span>
                <span>₹{discountedPrice.toLocaleString()}</span>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="flex items-center text-gray-600">
              <TrendingUp className="w-4 h-4 mr-1.5" /> 
              GST (18%)
            </span>
            <span>₹{taxAmount.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="bg-primary/10 rounded-xl p-4 mt-4">
          <div className="flex justify-between font-bold text-xl text-primary">
            <span>Total</span>
            <span>₹{finalTotal.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
          <div className="flex gap-3 items-center p-3 rounded-xl bg-blue-50 text-blue-700">
            <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Secure Payment</p>
              <p className="mt-0.5 text-blue-600">Your payment information is encrypted and secure.</p>
            </div>
          </div>
          
          <div className="flex gap-3 items-center p-3 rounded-xl bg-indigo-50 text-indigo-700">
            <CreditCard className="w-5 h-5 text-indigo-500 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Flexible Payment Options</p>
              <p className="mt-0.5 text-indigo-600">Pay with cards, wallets, or bank transfers.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
