
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  highlight?: boolean;
  badge?: string;
  billingPeriod: 'monthly' | 'yearly';
}

const SubscriptionPlans: React.FC = () => {
  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      description: 'Basic features for vendors just getting started',
      billingPeriod: 'monthly',
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
      description: 'Everything you need for growing your business',
      billingPeriod: 'monthly',
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
      description: 'For established businesses looking to scale',
      billingPeriod: 'monthly',
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

  const handleSubscribe = (planId: string) => {
    toast({
      title: "Subscription Selected",
      description: `You've selected the ${planId} plan. Redirecting to payment...`,
    });
  };

  return (
    <div className="py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground mt-2">
          Select the perfect plan to grow your event business
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`flex flex-col ${
              plan.highlight 
                ? 'border-primary shadow-lg relative' 
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
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="ml-1 text-muted-foreground">/{plan.billingPeriod}</span>
              </div>
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
            <CardFooter>
              <Button 
                className={`w-full ${plan.highlight ? 'bg-primary' : ''}`}
                variant={plan.highlight ? 'default' : 'outline'}
                onClick={() => handleSubscribe(plan.id)}
              >
                {plan.price === 0 ? 'Get Started' : 'Subscribe'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
