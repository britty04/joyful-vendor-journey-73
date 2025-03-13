import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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

const initialCheckoutData = {
  services: [
    {
      id: '1',
      name: 'Wedding Photography',
      price: 25000,
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      quantity: 1,
    },
    {
      id: '2',
      name: 'Catering Service',
      price: 35000,
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      quantity: 1,
    }
  ],
  totalPrice: 60000,
  discountedPrice: 60000,
  discountCode: '',
  discountAmount: 0,
};

const CheckoutFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState(initialCheckoutData);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [agreedToPolicies, setAgreedToPolicies] = useState(false);
  
  const handleUpdateQuantity = (serviceId: string, newQuantity: number) => {
    const updatedServices = checkoutData.services.map(service => 
      service.id === serviceId ? { ...service, quantity: newQuantity } : service
    );
    
    const newTotalPrice = updatedServices.reduce(
      (total, service) => total + (service.price * service.quantity), 0
    );
    
    setCheckoutData({
      ...checkoutData,
      services: updatedServices,
      totalPrice: newTotalPrice,
      discountedPrice: newTotalPrice - checkoutData.discountAmount
    });
  };
  
  const handleRemoveService = (serviceId: string) => {
    const updatedServices = checkoutData.services.filter(service => 
      service.id !== serviceId
    );
    
    const newTotalPrice = updatedServices.reduce(
      (total, service) => total + (service.price * service.quantity), 0
    );
    
    setCheckoutData({
      ...checkoutData,
      services: updatedServices,
      totalPrice: newTotalPrice,
      discountedPrice: newTotalPrice - checkoutData.discountAmount
    });
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
    if (currentStep === 4) return !!selectedPaymentMethod && agreedToPolicies;
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
                  selectedMethod={selectedPaymentMethod} 
                />
                <Separator className="my-6" />
                <Policies onAgreementChange={handlePolicyAgreement} isAgreed={agreedToPolicies} />
              </div>
            )}
            
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Order Confirmation</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Order Placed Successfully!</p>
                    <p className="text-sm text-green-700">Your order has been confirmed. You'll receive an email confirmation shortly.</p>
                  </div>
                </div>
                <ServiceSummary services={checkoutData.services} />
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">You might also be interested in:</h3>
                  <LastMinuteRecommendations eventType={checkoutData.services[0].name.includes('Wedding') ? 'wedding' : 'birthday'} />
                </div>
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
                  disabled={!canProceedToNext()}
                  className={`px-6 py-2 rounded-md ${canProceedToNext() ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {currentStep === 4 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            ) : (
              <div className="flex justify-center mt-8">
                <a href="/" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                  Back to Home
                </a>
              </div>
            )}
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
