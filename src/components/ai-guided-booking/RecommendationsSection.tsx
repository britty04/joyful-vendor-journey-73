
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import RecommendationCard, { ServiceRecommendation } from "./RecommendationCard";

interface RecommendationsSectionProps {
  isLoading: boolean;
  recommendations: ServiceRecommendation[];
  selectedServices: string[];
  onToggleSelection: (id: string) => void;
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
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  // Group recommendations by type
  const groupedRecommendations = recommendations.reduce((acc, recommendation) => {
    if (!acc[recommendation.type]) {
      acc[recommendation.type] = [];
    }
    acc[recommendation.type].push(recommendation);
    return acc;
  }, {} as Record<string, ServiceRecommendation[]>);

  // Get unique categories
  const categories = Object.keys(groupedRecommendations);

  // Initialize current category if not set
  if (categories.length > 0 && !currentCategory) {
    setCurrentCategory(categories[0]);
  }

  const handleComplete = () => {
    setIsProcessing(true);
    
    // Add selected services to cart
    recommendations
      .filter(rec => selectedServices.includes(rec.id))
      .forEach(service => {
        // Extract the numeric price
        const numericPrice = parseFloat(service.price.replace(/[^\d.]/g, ''));
        
        addToCart({
          id: service.id,
          name: service.name,
          price: numericPrice,
          image: service.image,
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Event date a week from now
        });
      });
    
    // Show success message
    toast({
      title: "Services added to cart",
      description: `${selectedServices.length} services have been added to your cart.`,
    });
    
    // Call the onSubmit callback
    onSubmit();
    
    // Navigate to checkout after a short delay
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/checkout");
    }, 1000);
  };

  const getCategoryTitle = (category: string) => {
    switch(category) {
      case 'mascot': return 'Character Mascots';
      case 'cake': return 'Custom Cakes';
      case 'photographer': return 'Photography';
      case 'decorator': return 'Decorations';
      case 'catering': return 'Catering Services';
      case 'games': return 'Games & Activities';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
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
          Complementary Services
        </h2>
        <p className="text-center text-gray-600 mb-2">
          Based on your {eventName?.toLowerCase()} with {primaryServiceName}, we recommend these additional services:
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="text-gray-600">Generating personalized recommendations...</p>
        </div>
      ) : (
        <>
          {/* Category tabs */}
          {categories.length > 1 && (
            <div className="flex overflow-x-auto pb-2 mb-6">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setCurrentCategory(category)}
                  className={`px-4 py-2 whitespace-nowrap mx-1 rounded-full transition-all ${
                    currentCategory === category 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getCategoryTitle(category)}
                </button>
              ))}
            </div>
          )}
          
          {/* Current category recommendations */}
          {currentCategory && (
            <>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                {getCategoryTitle(currentCategory)}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {groupedRecommendations[currentCategory]?.map((recommendation) => (
                  <RecommendationCard
                    key={recommendation.id}
                    recommendation={recommendation}
                    isSelected={selectedServices.includes(recommendation.id)}
                    onToggleSelection={onToggleSelection}
                  />
                ))}
              </div>
            </>
          )}
          
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">
                {selectedServices.length} services selected
              </span>
              <Button onClick={handleComplete} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  "Continue to Checkout"
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationsSection;
