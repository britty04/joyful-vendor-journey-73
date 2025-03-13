
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface CheckoutStepsProps {
  currentStep: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, name: 'Review' },
    { number: 2, name: 'Address' },
    { number: 3, name: 'Dates' },
    { number: 4, name: 'Payment' },
    { number: 5, name: 'Confirmation' }
  ];

  return (
    <div className="flex justify-between items-center w-full">
      {steps.map((step) => (
        <div key={step.number} className="flex flex-col items-center relative">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep > step.number
                ? 'bg-primary text-white'
                : currentStep === step.number
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {currentStep > step.number ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <span>{step.number}</span>
            )}
          </div>
          <p className={`text-xs mt-2 ${
            currentStep >= step.number ? 'text-primary font-medium' : 'text-gray-500'
          }`}>
            {step.name}
          </p>
          
          {/* Connector line */}
          {step.number < steps.length && (
            <div className="absolute top-4 left-8 w-[calc(100%-32px)] h-[2px] -translate-y-1/2 hidden md:block">
              <div 
                className={`h-full ${
                  currentStep > step.number ? 'bg-primary' : 'bg-gray-200'
                }`}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
