
import { Button } from "@/components/ui/button";
import { Bot, Check, ChevronRight, ShoppingCart } from "lucide-react";
import RecommendationCard, { ServiceRecommendation } from "./RecommendationCard";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface RecommendationsSectionProps {
  isLoading: boolean;
  recommendations: ServiceRecommendation[];
  selectedServices: string[];
  onToggleSelection: (serviceId: string) => void;
  primaryServiceName: string | undefined;
  eventName: string | undefined;
  onBack: () => void;
  onSubmit: () => void;
}

const RecommendationsSection = ({
  isLoading,
  recommendations,
  selectedServices,
  onToggleSelection,
  primaryServiceName,
  eventName,
  onBack,
  onSubmit
}: RecommendationsSectionProps) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCartAndCheckout = () => {
    // First notify the parent component
    onSubmit();
    
    // Get the selected recommendations
    const selectedRecommendations = recommendations.filter(service => 
      selectedServices.includes(service.id)
    );
    
    // Add each selected service to the cart
    selectedRecommendations.forEach(service => {
      // Convert price string (₹X,XXX) to number
      const priceValue = parseFloat(service.price.replace(/[₹,]/g, ''));
      
      addToCart({
        id: service.id,
        name: service.name,
        price: priceValue,
        image: service.image,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Event date a week from now
      });
    });
    
    // Show success toast
    toast({
      title: "Services added to cart!",
      description: `${selectedRecommendations.length} services have been added to your cart.`,
    });
    
    // Navigate to checkout
    navigate('/checkout');
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
        Recommended complementary services
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Our AI suggests these services to complete your perfect event.
      </p>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Our AI is analyzing the best combinations...</p>
        </div>
      ) : (
        <>
          <div className="relative px-4 py-3 bg-eventYellow-50 border border-eventYellow-200 rounded-lg mb-6 flex items-start">
            <Bot className="w-5 h-5 text-eventYellow-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-gray-800">
                Based on your selection of a <strong>{primaryServiceName}</strong> for 
                your <strong>{eventName}</strong>, I recommend these complementary services for a cohesive experience.
              </p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            {recommendations.map((service) => (
              <RecommendationCard 
                key={service.id} 
                service={service} 
                isSelected={selectedServices.includes(service.id)}
                onToggleSelection={onToggleSelection}
              />
            ))}
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button 
              onClick={handleAddToCartAndCheckout}
              className="gap-1"
              disabled={selectedServices.length === 0}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart & Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationsSection;
