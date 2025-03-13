
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import ServiceSummary from './ServiceSummary';
import DateReview from './DateReview';
import AddressSelection from './AddressSelection';
import DiscountCode from './DiscountCode';
import PaymentMethod from './PaymentMethod';
import Policies from './Policies';
import OrderSummary from './OrderSummary';
import LastMinuteRecommendations from './LastMinuteRecommendations';
import CheckoutSteps from './CheckoutSteps';
import CartSection from './CartSection';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { PaymentDetails } from './PaymentForm';

interface CheckoutFlowProps {
  onOrderComplete?: () => void;
}

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ onOrderComplete }) => {
  const navigate = useNavigate();
  const { items: cartItems, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState({
    services: cartItems,
    totalPrice: subtotal,
    discountedPrice: subtotal,
    discountCode: '',
    discountAmount: 0,
  });
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [agreedToPolicies, setAgreedToPolicies] = useState(false);
  
  useEffect(() => {
    setCheckoutData(prev => ({
      ...prev,
      services: cartItems,
      totalPrice: subtotal,
      discountedPrice: subtotal - prev.discountAmount,
    }));
  }, [cartItems, subtotal]);
  
  const handleUpdateQuantity = (serviceId: string, newQuantity: number) => {
    updateQuantity(serviceId, newQuantity);
  };
  
  const handleRemoveService = (serviceId: string) => {
    removeFromCart(serviceId);
  };
  
  const handleApplyDiscount = (code: string, amount: number) => {
    setCheckoutData({
      ...checkoutData,
      discountCode: code,
      discountAmount: amount,
      discountedPrice: checkoutData.totalPrice - amount
    });
    
    toast({
      title: "Discount Applied",
      description: `Coupon ${code} has been applied to your order.`,
    });
  };

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  const handleSelectPaymentMethod = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handlePolicyAgreement = (agreed: boolean) => {
    setAgreedToPolicies(agreed);
  };

  const handleProcessPayment = (details: PaymentDetails) => {
    setIsProcessingPayment(true);
    setPaymentDetails(details);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      nextStep(); // Move to confirmation step after payment
    }, 1500);
  };

  const handleCompleteBooking = () => {
    // Create booking data
    const paymentMethodName = paymentDetails 
      ? `Card ending in ${paymentDetails.lastFour}`
      : selectedPaymentMethod === 'upi1'
        ? 'UPI Payment'
        : selectedPaymentMethod === 'cash1'
          ? 'Cash on Delivery'
          : 'Credit/Debit Card';
    
    const bookingDetails = {
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      bookingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Event date a week from now
      services: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity
      })),
      venue: "Customer's Selected Address",
      paymentMethod: paymentMethodName,
      totalAmount: checkoutData.discountedPrice
    };
    
    // Save to localStorage for persistence
    localStorage.setItem('lastBooking', JSON.stringify(bookingDetails));
    
    // Clear cart
    if (onOrderComplete) {
      onOrderComplete();
    }
    clearCart();
    
    // Navigate to success page
    navigate('/booking/success', { state: { bookingDetails } });
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
    
    if (currentStep === 4) {
      handleCompleteBooking();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const canProceedToNext = () => {
    if (currentStep === 1) return checkoutData.services.length > 0;
    if (currentStep === 2) return !!selectedAddress;
    if (currentStep === 3) return true;
    if (currentStep === 4) {
      if (selectedPaymentMethod === 'card-form') {
        return !!paymentDetails && agreedToPolicies;
      }
      return !!selectedPaymentMethod && agreedToPolicies;
    }
    return true;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <CheckoutSteps currentStep={currentStep} />
        
        {currentStep < 5 && (
          <CartSection 
            services={checkoutData.services}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveService={handleRemoveService}
            onSelectPaymentMethod={handleSelectPaymentMethod}
            selectedMethod={selectedPaymentMethod}
          />
        )}
        
        <Card>
          <CardContent className="pt-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Review Services</h2>
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
                <h2 className="text-xl font-semibold">Select Delivery Address</h2>
                <AddressSelection onSelectAddress={handleSelectAddress} selectedAddress={selectedAddress} />
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Review Event Dates</h2>
                <DateReview services={checkoutData.services} />
              </div>
            )}
            
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Payment & Policies</h2>
                <PaymentMethod 
                  onSelectPaymentMethod={handleSelectPaymentMethod} 
                  onProcessPayment={handleProcessPayment}
                  selectedMethod={selectedPaymentMethod} 
                  amount={checkoutData.discountedPrice}
                  isProcessingPayment={isProcessingPayment}
                />
                <Separator className="my-6" />
                <Policies onAgreementChange={handlePolicyAgreement} isAgreed={agreedToPolicies} />
              </div>
            )}
            
            {currentStep < 5 ? (
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <button 
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                <button 
                  onClick={nextStep}
                  disabled={!canProceedToNext() || isProcessingPayment}
                  className={`px-6 py-2 rounded-md ${canProceedToNext() && !isProcessingPayment ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {isProcessingPayment ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Processing...
                    </>
                  ) : currentStep === 4 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <OrderSummary 
            services={checkoutData.services}
            totalPrice={checkoutData.totalPrice}
            discount={checkoutData.discountAmount}
            discountedPrice={checkoutData.discountedPrice}
            discountCode={checkoutData.discountCode}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
