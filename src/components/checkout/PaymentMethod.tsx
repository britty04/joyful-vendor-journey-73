
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard, WalletCards, IndianRupee, Plus, Lock } from 'lucide-react';
import PaymentForm, { PaymentDetails } from './PaymentForm';

interface PaymentOption {
  id: string;
  name: string;
  type: 'card' | 'upi' | 'cash';
  details?: string;
  icon: React.ReactNode;
}

// Mock payment options
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

interface PaymentMethodProps {
  onSelectPaymentMethod: (methodId: string) => void;
  onProcessPayment: (paymentDetails: PaymentDetails) => void;
  selectedMethod: string | null;
  amount: number;
  isProcessingPayment: boolean;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ 
  onSelectPaymentMethod,
  onProcessPayment,
  selectedMethod,
  amount,
  isProcessingPayment
}) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleAddNewCard = () => {
    // In a real app, this would save card details securely
    // Here we'll just simulate adding to the selection
    onSelectPaymentMethod('new-card');
    setShowAddCard(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <Lock className="w-4 h-4 mr-1" />
        <span>All transactions are secure and encrypted</span>
      </div>
      
      {selectedMethod === 'card-form' ? (
        <PaymentForm 
          onPaymentComplete={onProcessPayment}
          amount={amount}
          isProcessing={isProcessingPayment}
        />
      ) : (
        <RadioGroup 
          value={selectedMethod || undefined} 
          onValueChange={onSelectPaymentMethod}
        >
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:border-primary transition-colors">
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
                    <p className="text-gray-600 text-sm ml-7 mt-1">{option.details}</p>
                  )}
                  
                  {option.type === 'cash' && (
                    <p className="text-gray-600 text-sm ml-7 mt-1">Pay when your service is delivered</p>
                  )}
                </div>
              </div>
            ))}
            
            <div 
              className="flex items-center p-4 border border-dashed rounded-lg hover:border-primary transition-colors cursor-pointer"
              onClick={() => onSelectPaymentMethod('card-form')}
            >
              <div className="mr-3 w-5 h-5 flex items-center justify-center">
                <Plus className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Add a new card</p>
                <p className="text-gray-600 text-sm">Pay with a new credit or debit card</p>
              </div>
            </div>
          </div>
        </RadioGroup>
      )}
    </div>
  );
};

export default PaymentMethod;
