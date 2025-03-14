
import React from 'react';
import { Check, ShoppingBag, Sparkles, MapPin, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import RecommendationCard, { ServiceRecommendation } from './RecommendationCard';

interface RecommendationsSectionProps {
  isLoading: boolean;
  recommendations: ServiceRecommendation[];
  selectedServices: string[];
  onToggleSelection: (serviceId: string) => void;
  primaryServiceName?: string;
  eventName?: string;
  onBack: () => void;
  onSubmit: () => void;
  selectedCity?: string;
  selectedDate?: Date;
  selectedTime?: string;
}

const RecommendationsSection = ({
  isLoading,
  recommendations,
  selectedServices,
  onToggleSelection,
  primaryServiceName,
  eventName,
  onBack,
  onSubmit,
  selectedCity = "Local Area",
  selectedDate = new Date(),
  selectedTime = "12:00 PM"
}: RecommendationsSectionProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    // Add selected recommendations to cart
    selectedServices.forEach(serviceId => {
      const recommendation = recommendations.find(r => r.id === serviceId);
      if (recommendation) {
        addToCart({
          id: recommendation.id,
          name: recommendation.name,
          price: parseInt(recommendation.price.replace(/[^\d]/g, '')),
          image: recommendation.image,
          date: selectedDate,
          time: selectedTime,
          location: selectedCity,
          quantity: 1
        });
      }
    });
    
    toast({
      title: "Services added to cart",
      description: `${selectedServices.length} complementary services have been added to your cart.`,
    });
    
    onSubmit();
    
    // Navigate to checkout
    setTimeout(() => {
      navigate('/checkout');
    }, 500);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center justify-center mb-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          Recommended Services for Your {eventName}
        </h2>
        <p className="text-center text-gray-600 mb-3">
          Our AI recommends these complementary services to go with your {primaryServiceName?.toLowerCase()}.
        </p>
        
        {/* Location and date display */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
            {selectedCity}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
            {format(selectedDate, 'MMM dd, yyyy')}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-400" />
            {selectedTime}
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                isSelected={selectedServices.includes(recommendation.id)}
                onToggleSelection={() => onToggleSelection(recommendation.id)}
              />
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-lg mb-3">Your Selected Services</h3>
            {selectedServices.length === 0 ? (
              <p className="text-gray-500">
                You haven't selected any additional services yet. Select from the recommendations above.
              </p>
            ) : (
              <>
                <ul className="space-y-2 mb-4">
                  {selectedServices.map((serviceId) => {
                    const service = recommendations.find(r => r.id === serviceId);
                    return (
                      <li key={serviceId} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="font-medium">{service?.name}</span>
                        <span className="ml-auto">{service?.price}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="text-right text-sm text-gray-500">
                  <strong>{selectedServices.length}</strong> additional services selected
                </div>
              </>
            )}
          </div>
        </>
      )}
      
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        
        <Button 
          onClick={handleAddToCart} 
          disabled={isLoading || (selectedServices.length === 0)}
        >
          Proceed to Checkout
          <ShoppingBag className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsSection;
