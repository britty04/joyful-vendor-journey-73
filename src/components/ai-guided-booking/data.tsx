
import React from 'react';
import { EventType } from './EventTypeSelector';
import { Cake, Heart, Briefcase, Baby, Calendar, GraduationCap, Star, PartyPopper, Gift } from 'lucide-react';

// Define the service interface
export interface Service {
  id: string;
  name: string;
  icon: string;
  price?: string; // Add price property
  image?: string; // Add image property
}

// Event types with enhanced visual styling
export const eventTypes: EventType[] = [
  { 
    id: 'birthday',
    name: 'Birthday Party', 
    description: 'Celebrate another trip around the sun!',
    icon: <div className="text-pink-500">
      <Cake size={32} className="stroke-2" />
    </div>,
    theme: {
      gradient: "bg-gradient-to-r from-pink-400 to-yellow-400",
      textColor: "text-gray-800",
      borderColor: "border-pink-300",
      iconBackground: "bg-white/30"
    }
  },
  { 
    id: 'wedding',
    name: 'Wedding', 
    description: 'Make your special day unforgettable',
    icon: <div className="text-purple-500">
      <Heart size={32} className="stroke-2" />
    </div>,
    theme: {
      gradient: "bg-gradient-to-r from-purple-400 to-pink-300",
      textColor: "text-gray-800",
      borderColor: "border-purple-200",
      iconBackground: "bg-white/30"
    }
  },
  { 
    id: 'corporate',
    name: 'Corporate Event', 
    description: 'Impress your colleagues and clients',
    icon: <div className="text-blue-500">
      <Briefcase size={32} className="stroke-2" />
    </div>,
    theme: {
      gradient: "bg-gradient-to-r from-blue-600 to-cyan-500",
      textColor: "text-white",
      borderColor: "border-blue-400",
      iconBackground: "bg-white/20"
    }
  },
  { 
    id: 'baby-shower',
    name: 'Baby Shower', 
    description: 'Welcome the little one with love',
    icon: <div className="text-blue-300">
      <Baby size={32} className="stroke-2" />
    </div>,
    theme: {
      gradient: "bg-gradient-to-r from-blue-300 to-pink-300",
      textColor: "text-gray-800",
      borderColor: "border-blue-200",
      iconBackground: "bg-white/30"
    }
  },
  { 
    id: 'anniversary',
    name: 'Anniversary', 
    description: 'Celebrate years of togetherness',
    icon: <div className="text-red-500">
      <Calendar size={32} className="stroke-2" />
    </div>,
    theme: {
      gradient: "bg-gradient-to-r from-red-400 to-pink-300",
      textColor: "text-gray-800",
      borderColor: "border-red-200",
      iconBackground: "bg-white/30"
    }
  },
  { 
    id: 'graduation',
    name: 'Graduation', 
    description: 'Celebrate academic achievements',
    icon: <div className="text-blue-500">
      <GraduationCap size={32} className="stroke-2" />
    </div>,
    theme: {
      gradient: "bg-gradient-to-r from-blue-500 to-green-400",
      textColor: "text-white",
      borderColor: "border-blue-300",
      iconBackground: "bg-white/20"
    }
  },
  { 
    id: 'religious',
    name: 'Religious Ceremony', 
    description: 'Honor faith and traditions',
    icon: <div className="text-amber-500">
      <Star size={32} className="stroke-2" />
    </div>,
    theme: {
      gradient: "bg-gradient-to-r from-amber-400 to-yellow-300",
      textColor: "text-gray-800",
      borderColor: "border-amber-300",
      iconBackground: "bg-white/30"
    }
  },
  { 
    id: 'other',
    name: 'Other Event', 
    description: 'Create a custom event experience',
    icon: <div className="text-gray-600">
      <PartyPopper size={32} className="stroke-2" />
    </div>,
    theme: {
      gradient: "bg-gradient-to-r from-gray-300 to-gray-400",
      textColor: "text-gray-800",
      borderColor: "border-gray-300",
      iconBackground: "bg-white/30"
    }
  }
];

// Primary services for birthday events
export const birthdayPrimaryServices: Service[] = [
  { id: 'magician', name: 'Magician', icon: '🎩', price: '₹6,000', image: 'https://images.unsplash.com/photo-1589123053646-9fa2a86a6e8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'clown', name: 'Clown', icon: '🤡', price: '₹4,500', image: 'https://images.unsplash.com/photo-1573747806413-2aef4c8542fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'catering', name: 'Catering', icon: '🍰', price: '₹12,000', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'venue', name: 'Venue', icon: '🏰', price: '₹25,000', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'photographer', name: 'Photographer', icon: '📷', price: '₹8,000', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'decorator', name: 'Decorator', icon: '🎈', price: '₹10,000', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'games', name: 'Game Host', icon: '🎮', price: '₹5,000', image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'music', name: 'DJ / Music', icon: '🎵', price: '₹7,500', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

// Primary services for wedding events (expanded with WedMeGood inspiration)
export const weddingPrimaryServices: Service[] = [
  { id: 'venue', name: 'Venue', icon: '🏰' },
  { id: 'catering', name: 'Catering', icon: '🍽️' },
  { id: 'photographer', name: 'Photographer', icon: '📷' },
  { id: 'florist', name: 'Florist', icon: '💐' },
  { id: 'music', name: 'DJ / Band', icon: '🎵' },
  { id: 'decor', name: 'Decorator', icon: '✨' },
  { id: 'cake', name: 'Cake Designer', icon: '🍰' },
  { id: 'transport', name: 'Transportation', icon: '🚗' },
  { id: 'makeup', name: 'Bridal Makeup', icon: '💄' },
  { id: 'mehendi', name: 'Mehendi Artist', icon: '🌿' },
  { id: 'jewelry', name: 'Jewelry', icon: '💎' },
  { id: 'choreographer', name: 'Choreographer', icon: '💃' },
  { id: 'invitation', name: 'Invitations', icon: '✉️' },
  { id: 'priest', name: 'Priest/Officiant', icon: '🙏' }
];

// Primary services for corporate events
export const corporatePrimaryServices: Service[] = [
  { id: 'venue', name: 'Venue', icon: '🏢' },
  { id: 'catering', name: 'Catering', icon: '🍽️' },
  { id: 'av', name: 'AV Equipment', icon: '🎛️' },
  { id: 'speaker', name: 'Speaker/Presenter', icon: '🎤' },
  { id: 'decor', name: 'Decorator', icon: '✨' },
  { id: 'photographer', name: 'Photographer', icon: '📷' },
  { id: 'transport', name: 'Transportation', icon: '🚗' },
  { id: 'staffing', name: 'Event Staff', icon: '👥' },
  { id: 'gifts', name: 'Corporate Gifts', icon: '🎁' },
  { id: 'stalls', name: 'Exhibition Stalls', icon: '🏠' },
  { id: 'app', name: 'Event App', icon: '📱' },
  { id: 'security', name: 'Security Services', icon: '🔒' }
];

// Primary services for ticketed events
export const ticketedEventsPrimaryServices: Service[] = [
  { id: 'venue', name: 'Event Venue', icon: '🏟️' },
  { id: 'artist', name: 'Artists/Performers', icon: '🎭' },
  { id: 'sound', name: 'Sound & Lighting', icon: '🔊' },
  { id: 'ticketing', name: 'Ticketing Platform', icon: '🎟️' },
  { id: 'security', name: 'Security', icon: '💂' },
  { id: 'catering', name: 'Food & Beverage', icon: '🍔' },
  { id: 'marketing', name: 'Event Marketing', icon: '📣' },
  { id: 'sponsor', name: 'Sponsorships', icon: '🤝' }
];
