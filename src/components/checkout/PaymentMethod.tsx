
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard, WalletCards, IndianRupee, Plus, Lock } from 'lucide-react';

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
  selectedMethod: string | null;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ 
  onSelectPaymentMethod,
  selectedMethod 
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
          
          {/* Add new card option */}
          <div 
            className={`p-4 border border-dashed rounded-lg hover:border-primary transition-colors cursor-pointer ${showAddCard ? 'border-primary bg-primary/5' : ''}`}
            onClick={() => setShowAddCard(true)}
          >
            <div className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium">Add a new payment method</span>
            </div>
          </div>
        </div>
      </RadioGroup>
      
      {/* New card form */}
      {showAddCard && (
        <div className="mt-6 border rounded-lg p-4 bg-gray-50">
          <h3 className="font-medium mb-4 flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Add New Card
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full">
              <Label htmlFor="card-number">Card Number</Label>
              <Input 
                id="card-number" 
                placeholder="1234 5678 9012 3456"
                value={newCard.cardNumber}
                onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
              />
            </div>
            
            <div className="col-span-full">
              <Label htmlFor="card-name">Name on Card</Label>
              <Input 
                id="card-name" 
                placeholder="John Doe"
                value={newCard.name}
                onChange={(e) => setNewCard({...newCard, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input 
                id="expiry" 
                placeholder="MM/YY"
                value={newCard.expiry}
                onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input 
                id="cvv" 
                placeholder="123"
                type="password"
                value={newCard.cvv}
                onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowAddCard(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddNewCard}
              disabled={!newCard.cardNumber || !newCard.name || !newCard.expiry || !newCard.cvv}
            >
              Save Card
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
