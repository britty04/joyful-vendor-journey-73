
import React from 'react';

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

  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 ? (
        <button 
          onClick={onPrev}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
      ) : (
        <div></div>
      )}
      <button 
        onClick={onNext}
        disabled={!canProceedToNext() || isProcessingPayment}
        className={`px-6 py-2 rounded-md transition-all duration-300 ${canProceedToNext() && !isProcessingPayment ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        {isProcessingPayment ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            Processing...
          </>
        ) : currentStep === 4 ? 'Place Order' : 'Continue'}
      </button>
    </div>
  );
};

export default CheckoutNavigation;
