
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Sparkles, ChevronRight, CalendarDays, Check, Wand2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// Define the event type interface
interface EventType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

// Define the recommendation interface
interface ServiceRecommendation {
  id: string;
  type: string;
  name: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  relevanceScore: number;
}

const AIGuidedBooking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [primaryService, setPrimaryService] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<ServiceRecommendation[]>([]);
  
  // Event types
  const eventTypes: EventType[] = [
    { 
      id: 'birthday',
      name: 'Birthday Party', 
      description: 'Celebrate another trip around the sun!',
      icon: <span className="text-3xl">🎂</span>
    },
    { 
      id: 'wedding',
      name: 'Wedding', 
      description: 'Make your special day unforgettable',
      icon: <span className="text-3xl">💍</span>
    },
    { 
      id: 'corporate',
      name: 'Corporate Event', 
      description: 'Impress your colleagues and clients',
      icon: <span className="text-3xl">👔</span>
    },
    { 
      id: 'baby-shower',
      name: 'Baby Shower', 
      description: 'Welcome the little one with love',
      icon: <span className="text-3xl">👶</span>
    },
    { 
      id: 'anniversary',
      name: 'Anniversary', 
      description: 'Celebrate years of togetherness',
      icon: <span className="text-3xl">❤️</span>
    },
    { 
      id: 'graduation',
      name: 'Graduation', 
      description: 'Celebrate academic achievements',
      icon: <span className="text-3xl">🎓</span>
    },
    { 
      id: 'religious',
      name: 'Religious Ceremony', 
      description: 'Honor faith and traditions',
      icon: <span className="text-3xl">✨</span>
    },
    { 
      id: 'other',
      name: 'Other Event', 
      description: 'Create a custom event experience',
      icon: <span className="text-3xl">🎪</span>
    }
  ];

  // Primary services for birthday events
  const birthdayPrimaryServices = [
    { id: 'magician', name: 'Magician', icon: '🎩' },
    { id: 'clown', name: 'Clown', icon: '🤡' },
    { id: 'catering', name: 'Catering', icon: '🍰' },
    { id: 'venue', name: 'Venue', icon: '🏰' },
    { id: 'photographer', name: 'Photographer', icon: '📷' },
    { id: 'decorator', name: 'Decorator', icon: '🎈' },
    { id: 'games', name: 'Game Host', icon: '🎮' },
    { id: 'music', name: 'DJ / Music', icon: '🎵' }
  ];

  // Mock function to get recommendations based on event type and primary service
  const fetchRecommendations = async (eventType: string, primaryService: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock recommendations
    if (eventType === 'birthday' && primaryService === 'magician') {
      setRecommendations([
        {
          id: 'v1',
          type: 'mascot',
          name: 'Superhero Mascot',
          description: 'Complement your magic show with a superhero appearance!',
          image: 'https://images.unsplash.com/photo-1520720682573-db72e738a259?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '₹4,500',
          rating: 4.7,
          relevanceScore: 95
        },
        {
          id: 'v2',
          type: 'cake',
          name: 'Magic-Themed Cake',
          description: 'A special cake to match your magic show theme.',
          image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '₹2,200',
          rating: 4.9,
          relevanceScore: 90
        },
        {
          id: 'v3',
          type: 'photographer',
          name: 'Event Photographer',
          description: 'Capture magical moments with a professional photographer.',
          image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '₹8,000',
          rating: 4.8,
          relevanceScore: 85
        }
      ]);
    } else {
      // Default recommendations
      setRecommendations([
        {
          id: 'v4',
          type: 'decorator',
          name: 'Themed Decorations',
          description: 'Create a magical atmosphere with themed decorations.',
          image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '₹6,500',
          rating: 4.6,
          relevanceScore: 80
        },
        {
          id: 'v5',
          type: 'catering',
          name: 'Premium Catering',
          description: 'Delicious food options for your guests.',
          image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '₹350/person',
          rating: 4.8,
          relevanceScore: 75
        },
        {
          id: 'v6',
          type: 'games',
          name: 'Fun Activities Host',
          description: 'Engaging games and activities for all ages.',
          image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          price: '₹5,000',
          rating: 4.7,
          relevanceScore: 70
        }
      ]);
    }
    
    setIsLoading(false);
  };

  const handleSelectEvent = (event: EventType) => {
    setSelectedEvent(event);
    setStep(2);
  };

  const handleSelectPrimaryService = (serviceId: string) => {
    setPrimaryService(serviceId);
    fetchRecommendations(selectedEvent?.id || '', serviceId);
    setStep(3);
  };

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = () => {
    toast({
      title: "Booking started!",
      description: "Your guided booking has been initiated.",
    });
    // In a real app, this would save the selection and redirect to checkout
    navigate('/vendors');
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white -z-10"></div>
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-eventBlue-100 rounded-full opacity-30 blur-3xl -z-10"></div>
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-eventPink-100 rounded-full opacity-30 blur-3xl -z-10"></div>
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            <Sparkles size={16} />
            <span>AI-Guided Booking</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Perfect Event</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Our AI will guide you through selecting the perfect combination of services for your event.
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm",
              step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
            )}>
              1
            </div>
            <div className={cn(
              "w-16 h-1 mx-1",
              step >= 2 ? "bg-primary" : "bg-gray-200"
            )}></div>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm",
              step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
            )}>
              2
            </div>
            <div className={cn(
              "w-16 h-1 mx-1",
              step >= 3 ? "bg-primary" : "bg-gray-200"
            )}></div>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm",
              step >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
            )}>
              3
            </div>
          </div>
        </div>
        
        {/* Step 1: Select Event Type */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">What type of event are you planning?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {eventTypes.map((event) => (
                <Card 
                  key={event.id}
                  className="cursor-pointer hover:border-primary hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  onClick={() => handleSelectEvent(event)}
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
        )}
        
        {/* Step 2: Select Primary Service */}
        {step === 2 && selectedEvent && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              What's the main service you need for your {selectedEvent.name.toLowerCase()}?
            </h2>
            <p className="text-center text-gray-600 mb-6">Select the most important service for your event.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {birthdayPrimaryServices.map((service) => (
                <button
                  key={service.id}
                  className={cn(
                    "p-4 rounded-lg border-2 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1",
                    primaryService === service.id 
                      ? "border-primary bg-primary/5 shadow-md" 
                      : "border-gray-200 hover:border-primary/50"
                  )}
                  onClick={() => handleSelectPrimaryService(service.id)}
                >
                  <span className="text-3xl mb-2">{service.icon}</span>
                  <span className="font-medium">{service.name}</span>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Recommendations */}
        {step === 3 && primaryService && (
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
                      Based on your selection of a <strong>{birthdayPrimaryServices.find(s => s.id === primaryService)?.name}</strong> for 
                      your <strong>{selectedEvent?.name}</strong>, I recommend these complementary services for a cohesive experience.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {recommendations.map((service) => (
                    <Card 
                      key={service.id}
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        selectedServices.includes(service.id) 
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
                              variant={selectedServices.includes(service.id) ? "default" : "outline"}
                              className={selectedServices.includes(service.id) ? "bg-primary" : ""}
                              onClick={() => toggleServiceSelection(service.id)}
                            >
                              {selectedServices.includes(service.id) ? (
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
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    className="gap-1"
                  >
                    Continue to Booking
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGuidedBooking;
