
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
  service: ServiceRecommendation;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
}

const RecommendationCard = ({ service, isSelected, onToggleSelection }: RecommendationCardProps) => {
  return (
    <Card 
      key={service.id}
      className={cn(
        "overflow-hidden transition-all duration-300",
        isSelected 
          ? "border-primary shadow-md" 
          : "hover:border-primary/50"
      )}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3">
          <div className="relative h-48 sm:h-full bg-gray-100">
            <img 
              src={service.image} 
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded">
              {service.type}
            </div>
            <div className={cn(
              "absolute bottom-2 left-2 text-xs font-medium px-2 py-1 rounded flex items-center",
              "bg-gradient-to-r from-eventPurple-500 to-eventPink-500 text-white"
            )}>
              <Wand2 size={12} className="mr-1" />
              {service.relevanceScore}% match
            </div>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{service.name}</h3>
            <div className="flex items-center">
              <div className="flex items-center bg-eventYellow-50 text-eventYellow-700 px-2 py-1 rounded text-xs font-medium">
                <Star size={12} className="fill-eventYellow-500 text-eventYellow-500 mr-1" />
                {service.rating}
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4">{service.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="font-bold">{service.price}</span>
            <Button
              variant={isSelected ? "default" : "outline"}
              className={isSelected ? "bg-primary" : ""}
              onClick={() => onToggleSelection(service.id)}
            >
              {isSelected ? (
                <>
                  <Check size={16} />
                  Selected
                </>
              ) : "Select"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecommendationCard;
