import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface EventType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  theme?: {
    gradient: string;
    textColor: string;
    borderColor: string;
    iconBackground?: string;
  };
}

interface EventTypeSelectorProps {
  eventTypes: EventType[];
  onSelectEvent: (event: EventType) => void;
}

const EventTypeSelector = ({ eventTypes, onSelectEvent }: EventTypeSelectorProps) => {
  // Map event types to themes if not already defined
  const themedEventTypes = eventTypes.map(event => {
    if (event.theme) return event;
    
    // Default themes based on event type
    let theme = {
      gradient: "bg-gradient-to-r from-eventPurple-500 to-eventPink-500",
      textColor: "text-white",
      borderColor: "border-eventPurple-300",
      iconBackground: "bg-white/20"
    };
    
    // Assign specific themes based on event type
    switch (event.id) {
      case 'birthday':
      case 'baby-shower':
        theme = {
          gradient: "bg-gradient-to-r from-pink-400 to-yellow-400",
          textColor: "text-gray-800",
          borderColor: "border-pink-300",
          iconBackground: "bg-white/30"
        };
        break;
      case 'corporate':
        theme = {
          gradient: "bg-gradient-to-r from-blue-600 to-cyan-500",
          textColor: "text-white",
          borderColor: "border-blue-400",
          iconBackground: "bg-white/20"
        };
        break;
      case 'wedding':
      case 'anniversary':
        theme = {
          gradient: "bg-gradient-to-r from-purple-400 to-pink-300",
          textColor: "text-gray-800",
          borderColor: "border-purple-200",
          iconBackground: "bg-white/30"
        };
        break;
      case 'graduation':
        theme = {
          gradient: "bg-gradient-to-r from-blue-500 to-green-400",
          textColor: "text-white",
          borderColor: "border-blue-300",
          iconBackground: "bg-white/20"
        };
        break;
      case 'religious':
        theme = {
          gradient: "bg-gradient-to-r from-amber-400 to-yellow-300",
          textColor: "text-gray-800",
          borderColor: "border-amber-300",
          iconBackground: "bg-white/30"
        };
        break;
      default:
        // Keep the default theme
        break;
    }
    
    return { ...event, theme };
  });

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">What type of event are you planning?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {themedEventTypes.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              className={cn(
                "cursor-pointer overflow-hidden border-2 transition-all duration-300",
                "hover:shadow-lg relative h-full",
                event.theme?.borderColor || "border-gray-200"
              )}
              onClick={() => onSelectEvent(event)}
            >
              <div className={cn(
                "absolute inset-0 opacity-90",
                event.theme?.gradient || "bg-gradient-to-r from-gray-100 to-gray-200"
              )} />
              
              <CardContent className={cn(
                "pt-6 pb-6 flex flex-col items-center text-center relative z-10 h-full",
                event.theme?.textColor || "text-gray-800"
              )}>
                <div className={cn(
                  "mb-4 w-16 h-16 rounded-full flex items-center justify-center",
                  event.theme?.iconBackground || "bg-white/10"
                )}>
                  {event.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{event.name}</h3>
                <p className={cn(
                  "text-sm",
                  event.theme?.textColor === "text-white" ? "text-white/80" : "text-gray-600"
                )}>
                  {event.description}
                </p>
                
                {/* Event-specific decorative elements */}
                {event.id === 'birthday' && (
                  <div className="absolute top-2 right-2 text-lg animate-bounce">🎉</div>
                )}
                {event.id === 'wedding' && (
                  <div className="absolute bottom-2 right-2 text-lg">💍</div>
                )}
                {event.id === 'corporate' && (
                  <div className="absolute bottom-2 left-2 text-lg">📊</div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventTypeSelector;
