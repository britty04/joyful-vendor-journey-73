
import { useState } from 'react';
import { Sparkles, Calendar, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { format } from 'date-fns';

import { eventTypes, birthdayPrimaryServices } from './ai-guided-booking/data';
import EventTypeSelector, { EventType } from './ai-guided-booking/EventTypeSelector';
import PrimaryServiceSelector from './ai-guided-booking/PrimaryServiceSelector';
import VendorSelection from './ai-guided-booking/VendorSelection';
import RecommendationsSection from './ai-guided-booking/RecommendationsSection';
import ProgressSteps from './ai-guided-booking/ProgressSteps';
import { ServiceRecommendation } from './ai-guided-booking/RecommendationCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample city data
const cities = [
  { id: 'delhi', name: 'Delhi' },
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'bangalore', name: 'Bangalore' },
  { id: 'hyderabad', name: 'Hyderabad' },
  { id: 'chennai', name: 'Chennai' },
  { id: 'kolkata', name: 'Kolkata' },
  { id: 'pune', name: 'Pune' },
  { id: 'ahmedabad', name: 'Ahmedabad' }
];

// Generate time slots from 9 AM to 9 PM
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 21; hour++) {
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    slots.push(`${hourFormatted}:00 ${ampm}`);
    slots.push(`${hourFormatted}:30 ${ampm}`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Sample vendor data for each primary service
const mockVendors = {
  magician: [
    {
      id: 'v-mag-1',
      name: 'Magic Mike',
      description: 'Professional magician with 10+ years of experience in birthday parties.',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      price: 8500,
      responseTime: 'Under 1 hour'
    },
    {
      id: 'v-mag-2',
      name: 'Mystic Mandy',
      description: 'Specializing in close-up magic and mind-reading performances.',
      image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      price: 7500,
      responseTime: '2 hours'
    },
    {
      id: 'v-mag-3',
      name: 'Wizard Wonders',
      description: 'Family-friendly magic shows with audience participation and humor.',
      image: 'https://images.unsplash.com/photo-1543157144-f636a331e10c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      price: 9000,
      responseTime: 'Under 3 hours'
    }
  ],
  dj: [
    {
      id: 'v-dj-1',
      name: 'Beats Master',
      description: 'DJ with extensive music collection perfect for children\'s parties.',
      image: 'https://images.unsplash.com/photo-1571266028253-6c868a7f9d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      price: 12000,
      responseTime: 'Under 2 hours'
    },
    {
      id: 'v-dj-2',
      name: 'Groove Central',
      description: 'High-energy DJ service with lighting and special effects.',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      price: 15000,
      responseTime: '1 hour'
    }
  ],
  catering: [
    {
      id: 'v-cat-1',
      name: 'Delicious Delights',
      description: 'Kid-friendly catering with colorful and tasty menu options.',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      price: 350,
      responseTime: 'Under 3 hours'
    },
    {
      id: 'v-cat-2',
      name: 'Party Platters',
      description: 'Customizable menu options for all dietary preferences.',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      price: 400,
      responseTime: '2 hours'
    }
  ],
  venue: [
    {
      id: 'v-ven-1',
      name: 'Wonder Palace',
      description: 'Indoor venue with themed rooms and play areas for children.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      price: 25000,
      responseTime: 'Under 4 hours'
    },
    {
      id: 'v-ven-2',
      name: 'Garden Celebrations',
      description: 'Beautiful outdoor venue with covered areas and play equipment.',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      price: 30000,
      responseTime: '1 hour'
    }
  ],
  decoration: [
    {
      id: 'v-dec-1',
      name: 'Balloon Wonderland',
      description: 'Specializing in elaborate balloon decorations and arches.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      price: 15000,
      responseTime: 'Under 2 hours'
    },
    {
      id: 'v-dec-2',
      name: 'Theme Masters',
      description: 'Custom theme decorations for any party concept.',
      image: 'https://images.unsplash.com/photo-1623091453747-f2bb67b9b814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      price: 18000,
      responseTime: '3 hours'
    }
  ],
  photographer: [
    {
      id: 'v-photo-1',
      name: 'Candid Captures',
      description: 'Specialized in photographing children and family events.',
      image: 'https://images.unsplash.com/photo-1552334823-a04707f8943d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      price: 10000,
      responseTime: 'Under 1 hour'
    },
    {
      id: 'v-photo-2',
      name: 'Memory Makers',
      description: 'Photography and video services for all special moments.',
      image: 'https://images.unsplash.com/photo-1599902981319-2afdcb292386?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      price: 12000,
      responseTime: '2 hours'
    }
  ],
  cake: [
    {
      id: 'v-cake-1',
      name: 'Sweet Creations',
      description: 'Custom-designed cakes for any theme or character.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      price: 2000,
      responseTime: '1 hour'
    },
    {
      id: 'v-cake-2',
      name: 'Fondant Fantasy',
      description: 'Artistically crafted cakes with premium ingredients.',
      image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      price: 2500,
      responseTime: 'Under 2 hours'
    }
  ],
  host: [
    {
      id: 'v-host-1',
      name: 'Fun Facilitator',
      description: 'Engaging MC who keeps the party flowing with games and activities.',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      price: 7000,
      responseTime: 'Under 3 hours'
    },
    {
      id: 'v-host-2',
      name: 'Party Pro',
      description: 'Professional host with experience in managing children\'s events.',
      image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      price: 8000,
      responseTime: '2 hours'
    }
  ]
};

const AIGuidedBooking = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [primaryService, setPrimaryService] = useState<string | null>(null);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<ServiceRecommendation[]>([]);
  
  // New state for city, date, and time
  const [selectedCity, setSelectedCity] = useState(cities[0].id);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState(timeSlots[8]); // Default to 1:00 PM
  
  // Function to get vendors for the selected primary service
  const getVendorsForService = (serviceId: string) => {
    if (serviceId && mockVendors[serviceId as keyof typeof mockVendors]) {
      // Filter vendors based on availability in the selected city on the selected date
      return mockVendors[serviceId as keyof typeof mockVendors].filter(vendor => {
        // In a real app, you would check the vendor's availability based on city, date, and time
        // For now, we'll just randomly make some vendors available and others not
        const random = Math.random();
        return random > 0.3; // 70% of vendors are available
      });
    }
    return [];
  };
  
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
    setStep(3);
  };
  
  const handleSelectVendor = (vendorId: string) => {
    setSelectedVendorId(vendorId);
  };
  
  const handleVendorContinue = () => {
    fetchRecommendations(selectedEvent?.id || '', primaryService || '');
    setStep(4);
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
    // The actual cart handling is now in RecommendationsSection
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      
      // Reset relevant state when going back
      if (step === 4) {
        setSelectedServices([]);
      } else if (step === 3) {
        setSelectedVendorId(null);
      } else if (step === 2) {
        setPrimaryService(null);
      }
    }
  };

  const getPrimaryServiceName = () => {
    return birthdayPrimaryServices.find(s => s.id === primaryService)?.name;
  };
  
  // Updated progress steps to include city/date/time
  const progressSteps = [
    { id: 1, name: "Event Type" },
    { id: 2, name: "Primary Service" },
    { id: 3, name: "Vendor Selection" },
    { id: 4, name: "Add-ons" }
  ];

  // Render city, date, and time selector
  const renderDateTimeLocation = () => {
    if (step < 2) return null;
    
    return (
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-medium text-gray-700 mb-3">Event Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map(time => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
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
        <div className="mb-10">
          <ol className="flex items-center w-full">
            {progressSteps.map((progressStep, i) => (
              <li key={progressStep.id} className={`flex items-center relative ${
                i < progressSteps.length - 1 ? "w-full" : ""
              }`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 z-10 transition-all ${
                  step > progressStep.id 
                    ? "bg-primary text-white" 
                    : step === progressStep.id 
                      ? "bg-primary/20 text-primary border-2 border-primary" 
                      : "bg-gray-100 text-gray-500 border-2 border-gray-200"
                }`}>
                  {step > progressStep.id ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{progressStep.id}</span>
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium transition-colors ${
                  step >= progressStep.id ? "text-primary" : "text-gray-500"
                }`}>
                  {progressStep.name}
                </span>
                
                {/* Connector line */}
                {i < progressSteps.length - 1 && (
                  <div className={`w-full h-0.5 mx-4 transition-colors ${
                    step > progressStep.id ? "bg-primary" : "bg-gray-200"
                  }`} />
                )}
              </li>
            ))}
          </ol>
        </div>
        
        {/* City, Date, and Time Selector */}
        {renderDateTimeLocation()}
        
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
        
        {/* Step 3: Vendor Selection */}
        {step === 3 && primaryService && selectedEvent && (
          <VendorSelection
            primaryServiceName={getPrimaryServiceName() || ''}
            primaryServiceId={primaryService}
            vendors={getVendorsForService(primaryService)}
            selectedVendorId={selectedVendorId}
            onSelectVendor={handleSelectVendor}
            onBack={handleBack}
            onContinue={handleVendorContinue}
            selectedCity={cities.find(city => city.id === selectedCity)?.name || ''}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        )}
        
        {/* Step 4: Recommendations for complementary services */}
        {step === 4 && primaryService && (
          <RecommendationsSection
            isLoading={isLoading}
            recommendations={recommendations}
            selectedServices={selectedServices}
            onToggleSelection={toggleServiceSelection}
            primaryServiceName={getPrimaryServiceName()}
            eventName={selectedEvent?.name}
            onBack={handleBack}
            onSubmit={handleSubmit}
            selectedCity={cities.find(city => city.id === selectedCity)?.name || ''}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        )}
      </div>
    </div>
  );
};

export default AIGuidedBooking;
