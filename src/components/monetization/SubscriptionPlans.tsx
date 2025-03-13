
import React, { useState } from 'react';
import { Check, Shield, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  yearlyPrice?: number;
  description: string;
  features: PlanFeature[];
  highlight?: boolean;
  badge?: string;
  billingPeriod: 'monthly' | 'yearly';
}

const SubscriptionPlans: React.FC = () => {
  const [yearlyBilling, setYearlyBilling] = useState(false);
  const [showPricingBreakdown, setShowPricingBreakdown] = useState<string | null>(null);
  
  const getPlans = (): Plan[] => [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      yearlyPrice: 0,
      description: 'Basic features for vendors just getting started',
      billingPeriod: yearlyBilling ? 'yearly' : 'monthly',
      features: [
        { text: 'List 3 services', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Standard support', included: true },
        { text: 'Accept bookings', included: true },
        { text: 'Featured listings', included: false },
        { text: 'Commission rate: 10%', included: true },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29.99,
      yearlyPrice: 299.90, // ~2 months free
      description: 'Everything you need for growing your business',
      billingPeriod: yearlyBilling ? 'yearly' : 'monthly',
      highlight: true,
      badge: 'Popular',
      features: [
        { text: 'List up to 15 services', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Priority support', included: true },
        { text: 'Accept bookings', included: true },
        { text: 'Featured listings', included: true },
        { text: 'Commission rate: 7%', included: true },
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: 79.99,
      yearlyPrice: 799.90, // ~2 months free
      description: 'For established businesses looking to scale',
      billingPeriod: yearlyBilling ? 'yearly' : 'monthly',
      features: [
        { text: 'Unlimited services', included: true },
        { text: 'Premium analytics', included: true },
        { text: 'Dedicated support', included: true },
        { text: 'Accept bookings', included: true },
        { text: 'Priority featured listings', included: true },
        { text: 'Commission rate: 5%', included: true },
      ],
    },
  ];

  const plans = getPlans();

  const handleSubscribe = (planId: string) => {
    toast({
      title: "Subscription Selected",
      description: `You've selected the ${planId} plan. Redirecting to payment...`,
    });
  };
  
  const toggleBillingPeriod = () => {
    setYearlyBilling(!yearlyBilling);
  };
  
  const togglePricingBreakdown = (planId: string) => {
    setShowPricingBreakdown(showPricingBreakdown === planId ? null : planId);
  };

  // Pricing breakdown details
  const getPricingBreakdown = (planId: string, price: number) => {
    const breakdowns: Record<string, { base: number, platform: number, tax: number }> = {
      'free': { base: 0, platform: 0, tax: 0 },
      'pro': { 
        base: price * 0.75, 
        platform: price * 0.15, 
        tax: price * 0.10 
      },
      'business': { 
        base: price * 0.75, 
        platform: price * 0.15, 
        tax: price * 0.10 
      },
    };
    
    return breakdowns[planId] || breakdowns['free'];
  };

  return (
    <div className="py-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground mt-2">
          Select the perfect plan to grow your event business
        </p>
      </div>
      
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full">
          <span className={`px-4 py-2 rounded-full ${!yearlyBilling ? 'bg-white shadow-sm' : ''}`}>
            Monthly
          </span>
          <Switch
            checked={yearlyBilling}
            onCheckedChange={toggleBillingPeriod}
          />
          <span className={`px-4 py-2 rounded-full ${yearlyBilling ? 'bg-white shadow-sm' : ''}`}>
            Yearly <Badge variant="outline" className="ml-1 bg-green-50 text-green-700 border-green-200">Save 20%</Badge>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan) => {
          const actualPrice = yearlyBilling && plan.yearlyPrice !== undefined 
            ? plan.yearlyPrice 
            : plan.price;
            
          const pricingBreakdown = getPricingBreakdown(plan.id, actualPrice);
          
          return (
            <Card 
              key={plan.id} 
              className={`flex flex-col relative ${
                plan.highlight 
                  ? 'border-primary shadow-lg' 
                  : 'border-border'
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-2 right-4 bg-primary text-white">
                  {plan.badge}
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">${actualPrice.toFixed(2)}</span>
                  <span className="ml-1 text-muted-foreground">/{plan.billingPeriod}</span>
                  
                  {plan.price > 0 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 ml-2"
                            onClick={() => togglePricingBreakdown(plan.id)}
                          >
                            <Info size={14} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View pricing breakdown</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                
                {showPricingBreakdown === plan.id && plan.price > 0 && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm">
                    <div className="font-medium mb-2">Pricing Breakdown:</div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-gray-600">Base Fee:</span>
                      <span className="text-right">${pricingBreakdown.base.toFixed(2)}</span>
                      <span className="text-gray-600">Platform Fee:</span>
                      <span className="text-right">${pricingBreakdown.platform.toFixed(2)}</span>
                      <span className="text-gray-600">Tax:</span>
                      <span className="text-right">${pricingBreakdown.tax.toFixed(2)}</span>
                      <div className="col-span-2 border-t border-gray-200 mt-1 pt-1">
                        <div className="flex justify-between font-medium">
                          <span>Total:</span>
                          <span>${actualPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check 
                        className={`mr-2 h-5 w-5 flex-shrink-0 ${
                          feature.included ? 'text-green-500' : 'text-gray-300'
                        }`} 
                      />
                      <span className={feature.included ? '' : 'text-muted-foreground line-through'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  className={`w-full ${plan.highlight ? 'bg-primary' : ''}`}
                  variant={plan.highlight ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {plan.price === 0 ? 'Get Started' : 'Subscribe'}
                </Button>
                
                {plan.price > 0 && (
                  <div className="flex items-center justify-center text-sm text-gray-500 gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Secure payment</span>
                  </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-12 max-w-2xl mx-auto text-center px-4">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 inline-flex items-start">
          <Shield className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
          <div className="text-left">
            <h3 className="font-medium text-blue-800 mb-1">100% Refund Guarantee</h3>
            <p className="text-blue-700 text-sm">
              If you're not satisfied with your subscription in the first 30 days, we offer a full refund, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
