
import React from 'react';
import { Loader2 } from 'lucide-react';

interface CheckoutNavigationProps {
  currentStep: number;
  canProceedToNext: () => boolean;
  isProcessingPayment: boolean;
  onNext: () => void;
  onPrev: () => void;
}

const CheckoutNavigation: React.FC<CheckoutNavigationProps> = ({
  currentStep,
  canProceedToNext,
  isProcessingPayment,
  onNext,
  onPrev
}) => {
  if (currentStep >= 5) return null;

  const buttonText = () => {
    if (isProcessingPayment) {
      return "Processing...";
    }
    
    switch (currentStep) {
      case 1: return "Continue to Address";
      case 2: return "Continue to Dates";
      case 3: return "Continue to Payment";
      case 4: return "Place Order";
      default: return "Continue";
    }
  };

  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 ? (
        <button 
          onClick={onPrev}
          disabled={isProcessingPayment}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
      ) : (
        <div></div>
      )}
      <button 
        onClick={onNext}
        disabled={!canProceedToNext() || isProcessingPayment}
        className={`px-6 py-2 rounded-md transition-all duration-300 min-w-[140px] ${
          canProceedToNext() && !isProcessingPayment 
            ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isProcessingPayment ? (
          <span className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Processing...
          </span>
        ) : buttonText()}
      </button>
    </div>
  );
};

export default CheckoutNavigation;
