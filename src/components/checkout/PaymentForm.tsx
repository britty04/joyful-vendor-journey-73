
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Lock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface PaymentFormProps {
  onPaymentComplete: (paymentDetails: PaymentDetails) => void;
  amount: number;
  isProcessing: boolean;
}

export interface PaymentDetails {
  id: string;
  cardNumber: string;
  nameOnCard: string;
  expiryDate: string;
  paymentMethod: 'credit' | 'debit' | 'upi' | 'cash';
  lastFour: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  onPaymentComplete, 
  amount, 
  isProcessing = false 
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and format with spaces
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value
      .substring(0, 16)
      .replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format as MM/YY
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setExpiryDate(value);
  };

  const validateForm = () => {
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast({
        title: "Invalid Card Number",
        description: "Please enter a valid 16-digit card number.",
        variant: "destructive",
      });
      return false;
    }
    
    if (nameOnCard.trim() === '') {
      toast({
        title: "Name Required",
        description: "Please enter the name on your card.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      toast({
        title: "Invalid Expiry Date",
        description: "Please enter a valid expiry date (MM/YY).",
        variant: "destructive",
      });
      return false;
    }
    
    if (cvv.length < 3) {
      toast({
        title: "Invalid CVV",
        description: "Please enter a valid CVV code.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const paymentDetails: PaymentDetails = {
        id: `payment-${Date.now()}`,
        cardNumber: cardNumber,
        nameOnCard: nameOnCard,
        expiryDate: expiryDate,
        paymentMethod: 'credit',
        lastFour: cardNumber.replace(/\s/g, '').slice(-4),
      };
      
      onPaymentComplete(paymentDetails);
      setIsSubmitting(false);
      
      toast({
        title: "Payment Successful",
        description: `Your payment of ₹${amount.toLocaleString()} has been processed successfully.`,
      });
    }, 2000);
  };
  
  const disabled = isProcessing || isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <Lock className="w-4 h-4 mr-1" />
        <span>All transactions are secure and encrypted</span>
      </div>
      
      <div className="p-4 border rounded-lg">
        <div className="flex items-center mb-4">
          <CreditCard className="w-5 h-5 mr-2 text-primary" />
          <h3 className="font-medium">Card Details</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              disabled={disabled}
              className="font-mono"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="name-on-card">Name on Card</Label>
            <Input
              id="name-on-card"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              placeholder="John Doe"
              disabled={disabled}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry-date">Expiry Date</Label>
              <Input
                id="expiry-date"
                value={expiryDate}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength={5}
                disabled={disabled}
                className="font-mono"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                placeholder="123"
                maxLength={3}
                disabled={disabled}
                className="font-mono"
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-primary to-primary/90 shadow-sm"
        disabled={disabled}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Processing...
          </>
        ) : (
          `Pay ₹${amount.toLocaleString()}`
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
