
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { PaymentDetails } from '@/components/checkout/PaymentForm';

export interface CheckoutState {
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
  paymentDetails: PaymentDetails | null;
  isProcessingPayment: boolean;
  agreedToPolicies: boolean;
  eventDetails: {
    city: string | null;
    date: Date | null;
    time: string | null;
  };
}

export function useCheckoutState() {
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
  const [eventDetails, setEventDetails] = useState({
    city: null as string | null,
    date: null as Date | null,
    time: null as string | null,
  });

  // Update checkout data when cart items change
  useEffect(() => {
    setCheckoutData(prev => ({
      ...prev,
      services: cartItems,
      totalPrice: subtotal,
      discountedPrice: subtotal - prev.discountAmount,
    }));
    
    // Extract event details from cart items if available
    if (cartItems.length > 0 && cartItems[0].location) {
      setEventDetails({
        city: cartItems[0].location,
        date: cartItems[0].date || null,
        time: cartItems[0].time || null,
      });
    }
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

  const handleUpdateEventDetails = (details: {
    city?: string | null;
    date?: Date | null;
    time?: string | null;
  }) => {
    setEventDetails(prev => ({
      ...prev,
      ...details
    }));
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

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
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

  return {
    checkoutState: {
      currentStep,
      checkoutData,
      selectedAddress,
      selectedPaymentMethod,
      paymentDetails,
      isProcessingPayment,
      agreedToPolicies,
      eventDetails
    },
    handlers: {
      handleUpdateQuantity,
      handleRemoveService,
      handleApplyDiscount,
      handleSelectAddress,
      handleSelectPaymentMethod,
      handlePolicyAgreement,
      handleProcessPayment,
      handleUpdateEventDetails,
      nextStep,
      prevStep,
      canProceedToNext,
      clearCart
    }
  };
}
