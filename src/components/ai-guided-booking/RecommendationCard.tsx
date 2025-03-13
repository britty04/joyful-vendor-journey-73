
import { cn } from "@/lib/utils";
import { Check, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

export interface ServiceRecommendation {
  id: string;
  type: string;
  name: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  relevanceScore: number;
}

interface RecommendationCardProps {
  recommendation: ServiceRecommendation;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
}

const RecommendationCard = ({ 
  recommendation, 
  isSelected, 
  onToggleSelection 
}: RecommendationCardProps) => {
  const { addToCart } = useCart();
  
  // Convert price string to a number for the cart
  const getNumericPrice = () => {
    // Remove the rupee symbol and commas, then parse as float
    return parseFloat(recommendation.price.replace('₹', '').replace(/,/g, ''));
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: recommendation.id,
      name: recommendation.name,
      price: getNumericPrice(),
      image: recommendation.image,
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Schedule for 7 days later
    });
    
    toast({
      title: "Added to cart",
      description: `${recommendation.name} has been added to your cart.`,
    });
  };
  
  return (
    <div className={cn(
      "border rounded-lg overflow-hidden transition-all duration-300 relative",
      isSelected ? "border-primary shadow-md" : "border-gray-200 hover:border-primary/30"
    )}>
      {/* Relevance Badge */}
      {recommendation.relevanceScore >= 90 && (
        <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium z-10">
          Perfect Match
        </div>
      )}
      
      {/* Selection indicator */}
      <div className={cn(
        "absolute top-3 right-3 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
        isSelected 
          ? "bg-primary border-primary text-white" 
          : "border-white bg-white/50"
      )}>
        {isSelected && <Check className="w-3 h-3" />}
      </div>
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recommendation.image} 
          alt={recommendation.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            "group-hover:scale-105"
          )}
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{recommendation.name}</h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center text-amber-500 mr-1">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="text-sm font-medium">{recommendation.rating}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{recommendation.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">{recommendation.price}</span>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              className="flex items-center"
            >
              <ShoppingBag className="w-3 h-3 mr-1" />
              Cart
            </Button>
            <Button 
              variant={isSelected ? "outline" : "default"}
              size="sm"
              onClick={() => onToggleSelection(recommendation.id)}
            >
              {isSelected ? "Remove" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
