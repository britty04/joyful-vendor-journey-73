
import { Button } from "@/components/ui/button";
import { Bot, Check, ChevronRight, ShoppingCart, Star, Sparkles } from "lucide-react";
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
  
  // Calculate how many services are recommended
  const recommendationCount = recommendations.length;
  
  // Calculate the average match score
  const averageMatchScore = recommendations.length 
    ? Math.round(recommendations.reduce((sum, rec) => sum + rec.relevanceScore, 0) / recommendations.length) 
    : 0;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
          <Sparkles size={28} className="text-primary" />
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 text-center">
          AI Recommended Services
        </h2>
        <p className="text-center text-gray-600 mb-3 max-w-xl">
          Our AI suggests these services to create your perfect {eventName?.toLowerCase() || "event"}.
        </p>
        
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-amber-500 fill-amber-500" />
            <span>Quality selected</span>
          </div>
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 mr-1 text-purple-500" />
            <span>{averageMatchScore}% match for your needs</span>
          </div>
          <div className="flex items-center">
            <Check className="w-4 h-4 mr-1 text-green-500" />
            <span>{recommendationCount} options</span>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Our AI is analyzing the best combinations...</p>
        </div>
      ) : (
        <>
          <div className="relative px-6 py-4 bg-gradient-to-r from-eventPurple-50 to-eventPink-50 border border-eventPurple-100 rounded-xl mb-8 flex items-start">
            <Bot className="w-8 h-8 text-eventPurple-500 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-gray-800 mb-1">AI Recommendation Insight</h3>
              <p className="text-gray-700">
                Based on your selection of a <strong>{primaryServiceName}</strong> for 
                your <strong>{eventName}</strong>, I've recommended these complementary services that often work well together.
                The services are ranked by relevance to create a cohesive experience.
              </p>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            {recommendations.map((service) => (
              <RecommendationCard 
                key={service.id} 
                service={service} 
                isSelected={selectedServices.includes(service.id)}
                onToggleSelection={onToggleSelection}
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack} className="gap-2">
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back
            </Button>
            <Button 
              onClick={handleAddToCartAndCheckout}
              className="gap-2 bg-gradient-to-r from-eventPurple-500 to-eventPink-500 hover:from-eventPurple-600 hover:to-eventPink-600"
              disabled={selectedServices.length === 0}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart & Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationsSection;
