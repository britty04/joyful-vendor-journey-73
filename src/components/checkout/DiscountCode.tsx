
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Tag, X } from 'lucide-react';

interface DiscountCodeProps {
  onApplyDiscount: (code: string, amount: number) => void;
  currentDiscount: number;
  currentCode: string;
}

// Mock discount codes for demo
const VALID_DISCOUNT_CODES = {
  'WELCOME10': { discount: 1000, type: 'fixed' },
  'EVENTS20': { discount: 0.20, type: 'percentage' },
  'WEDDING15': { discount: 0.15, type: 'percentage' }
};

const DiscountCode: React.FC<DiscountCodeProps> = ({ 
  onApplyDiscount, 
  currentDiscount,
  currentCode 
}) => {
  const [code, setCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCode = () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter a discount code",
        variant: "destructive",
      });
      return;
    }

    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      // @ts-ignore
      const discountInfo = VALID_DISCOUNT_CODES[code.toUpperCase()];
      
      if (discountInfo) {
        let discountAmount = 0;
        
        if (discountInfo.type === 'fixed') {
          discountAmount = discountInfo.discount;
        } else {
          // Assuming a base amount of 60000 for percentage calculation
          discountAmount = Math.round(60000 * discountInfo.discount);
        }
        
        onApplyDiscount(code.toUpperCase(), discountAmount);
        
        toast({
          title: "Success!",
          description: `Discount code ${code.toUpperCase()} applied successfully!`,
        });
      } else {
        toast({
          title: "Invalid Code",
          description: "The discount code you entered is invalid or expired.",
          variant: "destructive",
        });
      }
      
      setIsApplying(false);
      setCode('');
    }, 1000);
  };

  const removeDiscount = () => {
    onApplyDiscount('', 0);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="font-medium mb-3 flex items-center gap-2">
        <Tag className="w-4 h-4" />
        Apply Discount Code
      </h3>
      
      {currentDiscount > 0 ? (
        <div className="bg-primary/10 p-3 rounded-md flex justify-between items-center">
          <div>
            <span className="font-medium text-primary">{currentCode}</span>
            <span className="ml-2 text-gray-600">
              -₹{currentDiscount.toLocaleString()}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={removeDiscount}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="Enter discount code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-grow"
          />
          <Button 
            onClick={handleApplyCode} 
            disabled={isApplying || !code.trim()}
          >
            {isApplying ? "Applying..." : "Apply"}
          </Button>
        </div>
      )}
      
      <div className="mt-2 text-sm text-gray-500">
        Try: WELCOME10, EVENTS20, WEDDING15
      </div>
    </div>
  );
};

export default DiscountCode;
