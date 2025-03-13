
import React from 'react';
import { EventType } from './EventTypeSelector';

// Define the service interface
export interface Service {
  id: string;
  name: string;
  icon: string;
  price?: string; // Add price property
  image?: string; // Add image property
}

// Event types
export const eventTypes: EventType[] = [
  { 
    id: 'birthday',
    name: 'Birthday Party', 
    description: 'Celebrate another trip around the sun!',
    icon: React.createElement('span', { className: "text-3xl" }, '🎂')
  },
  { 
    id: 'wedding',
    name: 'Wedding', 
    description: 'Make your special day unforgettable',
    icon: React.createElement('span', { className: "text-3xl" }, '💍')
  },
  { 
    id: 'corporate',
    name: 'Corporate Event', 
    description: 'Impress your colleagues and clients',
    icon: React.createElement('span', { className: "text-3xl" }, '👔')
  },
  { 
    id: 'baby-shower',
    name: 'Baby Shower', 
    description: 'Welcome the little one with love',
    icon: React.createElement('span', { className: "text-3xl" }, '👶')
  },
  { 
    id: 'anniversary',
    name: 'Anniversary', 
    description: 'Celebrate years of togetherness',
    icon: React.createElement('span', { className: "text-3xl" }, '❤️')
  },
  { 
    id: 'graduation',
    name: 'Graduation', 
    description: 'Celebrate academic achievements',
    icon: React.createElement('span', { className: "text-3xl" }, '🎓')
  },
  { 
    id: 'religious',
    name: 'Religious Ceremony', 
    description: 'Honor faith and traditions',
    icon: React.createElement('span', { className: "text-3xl" }, '✨')
  },
  { 
    id: 'other',
    name: 'Other Event', 
    description: 'Create a custom event experience',
    icon: React.createElement('span', { className: "text-3xl" }, '🎪')
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
