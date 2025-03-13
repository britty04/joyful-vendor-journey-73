
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartSection from './CartSection';
import OrderSummary from './OrderSummary';
import LastMinuteRecommendations from './LastMinuteRecommendations';
import CheckoutSteps from './CheckoutSteps';
import CheckoutStepContent from './CheckoutStepContent';
import { useCheckoutState } from '@/hooks/useCheckoutState';
import { generateBookingDetails } from '@/utils/bookingUtils';

interface CheckoutFlowProps {
  onOrderComplete?: () => void;
}

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ onOrderComplete }) => {
  const navigate = useNavigate();
  const { checkoutState, handlers } = useCheckoutState();
  
  const handleCompleteBooking = () => {
    // Create booking data
    const bookingDetails = generateBookingDetails(
      checkoutState.checkoutData.services,
      checkoutState.checkoutData.discountedPrice,
      checkoutState.paymentDetails,
      checkoutState.selectedPaymentMethod
    );
    
    // Save to localStorage for persistence
    localStorage.setItem('lastBooking', JSON.stringify(bookingDetails));
    
    // Clear cart
    if (onOrderComplete) {
      onOrderComplete();
    }
    handlers.clearCart();
    
    // Navigate to success page
    navigate('/booking/success', { state: { bookingDetails } });
  };

  // Override the next step function for the final step
  const handleNextStep = () => {
    if (checkoutState.currentStep === 4) {
      handleCompleteBooking();
    } else {
      handlers.nextStep();
    }
  };

  const enhancedHandlers = {
    ...handlers,
    nextStep: handleNextStep
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <CheckoutSteps currentStep={checkoutState.currentStep} />
        
        {checkoutState.currentStep < 5 && (
          <CartSection 
            services={checkoutState.checkoutData.services}
            onUpdateQuantity={handlers.handleUpdateQuantity}
            onRemoveService={handlers.handleRemoveService}
            onSelectPaymentMethod={handlers.handleSelectPaymentMethod}
            selectedMethod={checkoutState.selectedPaymentMethod}
          />
        )}
        
        <CheckoutStepContent 
          currentStep={checkoutState.currentStep}
          checkoutData={checkoutState.checkoutData}
          selectedAddress={checkoutState.selectedAddress}
          selectedPaymentMethod={checkoutState.selectedPaymentMethod}
          isProcessingPayment={checkoutState.isProcessingPayment}
          agreedToPolicies={checkoutState.agreedToPolicies}
          handlers={enhancedHandlers}
        />
      </div>
      
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <OrderSummary 
            services={checkoutState.checkoutData.services}
            totalPrice={checkoutState.checkoutData.totalPrice}
            discount={checkoutState.checkoutData.discountAmount}
            discountedPrice={checkoutState.checkoutData.discountedPrice}
            discountCode={checkoutState.checkoutData.discountCode}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
