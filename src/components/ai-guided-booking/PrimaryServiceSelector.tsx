
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EventType } from "./EventTypeSelector";

interface Service {
  id: string;
  name: string;
  icon: string;
}

interface PrimaryServiceSelectorProps {
  services: Service[];
  selectedEvent: EventType;
  primaryService: string | null;
  onSelectService: (serviceId: string) => void;
  onBack: () => void;
}

const PrimaryServiceSelector = ({ 
  services,
  selectedEvent,
  primaryService,
  onSelectService,
  onBack
}: PrimaryServiceSelectorProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
        What's the main service you need for your {selectedEvent.name.toLowerCase()}?
      </h2>
      <p className="text-center text-gray-600 mb-6">Select the most important service for your event.</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {services.map((service) => (
          <button
            key={service.id}
            className={cn(
              "p-4 rounded-lg border-2 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1",
              primaryService === service.id 
                ? "border-primary bg-primary/5 shadow-md" 
                : "border-gray-200 hover:border-primary/50"
            )}
            onClick={() => onSelectService(service.id)}
          >
            <span className="text-3xl mb-2">{service.icon}</span>
            <span className="font-medium">{service.name}</span>
          </button>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default PrimaryServiceSelector;
