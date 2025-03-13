
import { Button } from "@/components/ui/button";
import { Bot, Check, ChevronRight } from "lucide-react";
import RecommendationCard, { ServiceRecommendation } from "./RecommendationCard";

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
              onClick={onSubmit}
              className="gap-1"
            >
              Continue to Booking
              <ChevronRight size={16} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationsSection;
