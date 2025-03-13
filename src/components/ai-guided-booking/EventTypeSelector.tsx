
import { Card, CardContent } from "@/components/ui/card";

export interface EventType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface EventTypeSelectorProps {
  eventTypes: EventType[];
  onSelectEvent: (event: EventType) => void;
}

const EventTypeSelector = ({ eventTypes, onSelectEvent }: EventTypeSelectorProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">What type of event are you planning?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {eventTypes.map((event) => (
          <Card 
            key={event.id}
            className="cursor-pointer hover:border-primary hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            onClick={() => onSelectEvent(event)}
          >
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="mb-4">{event.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{event.name}</h3>
              <p className="text-gray-500 text-sm">{event.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventTypeSelector;
