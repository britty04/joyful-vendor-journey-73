
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

import { eventTypes, birthdayPrimaryServices } from './ai-guided-booking/data';
import EventTypeSelector, { EventType } from './ai-guided-booking/EventTypeSelector';
import PrimaryServiceSelector from './ai-guided-booking/PrimaryServiceSelector';
import RecommendationsSection from './ai-guided-booking/RecommendationsSection';
import ProgressSteps from './ai-guided-booking/ProgressSteps';
import { ServiceRecommendation } from './ai-guided-booking/RecommendationCard';

const AIGuidedBooking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [primaryService, setPrimaryService] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<ServiceRecommendation[]>([]);
  
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

  const getPrimaryServiceName = () => {
    return birthdayPrimaryServices.find(s => s.id === primaryService)?.name;
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
        <ProgressSteps currentStep={step} />
        
        {/* Step 1: Select Event Type */}
        {step === 1 && (
          <EventTypeSelector 
            eventTypes={eventTypes} 
            onSelectEvent={handleSelectEvent} 
          />
        )}
        
        {/* Step 2: Select Primary Service */}
        {step === 2 && selectedEvent && (
          <PrimaryServiceSelector
            services={birthdayPrimaryServices}
            selectedEvent={selectedEvent}
            primaryService={primaryService}
            onSelectService={handleSelectPrimaryService}
            onBack={handleBack}
          />
        )}
        
        {/* Step 3: Recommendations */}
        {step === 3 && primaryService && (
          <RecommendationsSection
            isLoading={isLoading}
            recommendations={recommendations}
            selectedServices={selectedServices}
            onToggleSelection={toggleServiceSelection}
            primaryServiceName={getPrimaryServiceName()}
            eventName={selectedEvent?.name}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default AIGuidedBooking;
