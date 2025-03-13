
import React from 'react';
import { 
  Cake, Gift, Briefcase, HeartHandshake, GraduationCap, 
  Building, Church, PartyPopper, Users, Sparkles
} from 'lucide-react';

export const eventTypes = [
  {
    id: 'birthday',
    name: 'Birthday Party',
    description: 'Celebration of another trip around the sun',
    icon: <Cake className="w-8 h-8" />
  },
  {
    id: 'wedding',
    name: 'Wedding',
    description: 'The most special day of your life',
    icon: <HeartHandshake className="w-8 h-8" />
  },
  {
    id: 'corporate',
    name: 'Corporate Event',
    description: 'Professional gatherings that leave an impression',
    icon: <Briefcase className="w-8 h-8" />
  },
  {
    id: 'graduation',
    name: 'Graduation',
    description: 'Celebrate academic achievements',
    icon: <GraduationCap className="w-8 h-8" />
  },
  {
    id: 'religious',
    name: 'Religious Ceremony',
    description: 'Sacred moments of spiritual significance',
    icon: <Church className="w-8 h-8" />
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    description: 'Commemorate your special milestones',
    icon: <Gift className="w-8 h-8" />
  },
  {
    id: 'social',
    name: 'Social Gathering',
    description: 'Bringing people together for fun and connection',
    icon: <Users className="w-8 h-8" />
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    description: 'Welcome the newest addition to your family',
    icon: <PartyPopper className="w-8 h-8" />
  }
];

export const birthdayPrimaryServices = [
  {
    id: 'magician',
    name: 'Magician',
    icon: '🎩',
    description: 'Mesmerize your guests with amazing tricks',
    price: '₹8,000',
    image: 'https://images.unsplash.com/photo-1525388482443-d42ddb04196e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dj',
    name: 'DJ',
    icon: '🎧',
    description: 'Keep the party going with great music',
    price: '₹12,000',
    image: 'https://images.unsplash.com/photo-1571266028253-6c868a7f9d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'catering',
    name: 'Catering',
    icon: '🍽️',
    description: 'Delicious food for all your guests',
    price: '₹350/person',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'venue',
    name: 'Venue',
    icon: '🏨',
    description: 'Beautiful spaces for your celebration',
    price: '₹25,000',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'decoration',
    name: 'Decoration',
    icon: '🎈',
    description: 'Transform any space into a party zone',
    price: '₹15,000',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photographer',
    name: 'Photographer',
    icon: '📸',
    description: 'Capture memories that last forever',
    price: '₹10,000',
    image: 'https://images.unsplash.com/photo-1552334823-a04707f8943d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cake',
    name: 'Cake',
    icon: '🍰',
    description: 'Custom cakes for your special occasion',
    price: '₹2,000',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'host',
    name: 'Event Host',
    icon: '🎤',
    description: 'Professional MCs to guide your event',
    price: '₹7,000',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];
