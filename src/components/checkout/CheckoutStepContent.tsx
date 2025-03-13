
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ServiceSummary from './ServiceSummary';
import DateReview from './DateReview';
import AddressSelection from './AddressSelection';
import DiscountCode from './DiscountCode';
import PaymentMethod from './PaymentMethod';
import Policies from './Policies';
import { toast } from '@/hooks/use-toast';
import { PaymentDetails } from './PaymentForm';
import CheckoutNavigation from './CheckoutNavigation';

interface CheckoutStepContentProps {
  currentStep: number;
  checkoutData: {
    services: any[];
    totalPrice: number;
    discountedPrice: number;
    discountCode: string;
    discountAmount: number;
  };
  selectedAddress: string | null;
  selectedPaymentMethod: string | null;
  isProcessingPayment: boolean;
  agreedToPolicies: boolean;
  handlers: {
    handleApplyDiscount: (code: string, amount: number) => void;
    handleSelectAddress: (addressId: string) => void;
    handleSelectPaymentMethod: (methodId: string) => void;
    handlePolicyAgreement: (agreed: boolean) => void;
    handleProcessPayment: (details: PaymentDetails) => void;
    nextStep: () => void;
    prevStep: () => void;
    canProceedToNext: () => boolean;
  };
}

const CheckoutStepContent: React.FC<CheckoutStepContentProps> = ({
  currentStep,
  checkoutData,
  selectedAddress,
  selectedPaymentMethod,
  isProcessingPayment,
  agreedToPolicies,
  handlers
}) => {
  const handleApplyDiscount = (code: string, amount: number) => {
    handlers.handleApplyDiscount(code, amount);
    toast({
      title: "Discount Applied",
      description: `Coupon ${code} has been applied to your order.`,
    });
  };

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Review Services</h2>
            <ServiceSummary services={checkoutData.services} />
            <DiscountCode 
              onApplyDiscount={handleApplyDiscount} 
              currentDiscount={checkoutData.discountAmount}
              currentCode={checkoutData.discountCode}
            />
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Select Delivery Address</h2>
            <AddressSelection onSelectAddress={handlers.handleSelectAddress} selectedAddress={selectedAddress} />
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Review Event Dates</h2>
            <DateReview services={checkoutData.services} />
          </div>
        )}
        
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Payment & Policies</h2>
            <PaymentMethod 
              onSelectPaymentMethod={handlers.handleSelectPaymentMethod} 
              onProcessPayment={handlers.handleProcessPayment}
              selectedMethod={selectedPaymentMethod} 
              amount={checkoutData.discountedPrice}
              isProcessingPayment={isProcessingPayment}
            />
            <Separator className="my-6" />
            <Policies onAgreementChange={handlers.handlePolicyAgreement} isAgreed={agreedToPolicies} />
          </div>
        )}
        
        <CheckoutNavigation 
          currentStep={currentStep}
          canProceedToNext={handlers.canProceedToNext}
          isProcessingPayment={isProcessingPayment}
          onNext={handlers.nextStep}
          onPrev={handlers.prevStep}
        />
      </CardContent>
    </Card>
  );
};

export default CheckoutStepContent;
