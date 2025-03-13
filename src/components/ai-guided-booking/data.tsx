
import React from 'react';
import { EventType } from './EventTypeSelector';

// Define the service interface
export interface Service {
  id: string;
  name: string;
  icon: string;
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
  { id: 'magician', name: 'Magician', icon: '🎩' },
  { id: 'clown', name: 'Clown', icon: '🤡' },
  { id: 'catering', name: 'Catering', icon: '🍰' },
  { id: 'venue', name: 'Venue', icon: '🏰' },
  { id: 'photographer', name: 'Photographer', icon: '📷' },
  { id: 'decorator', name: 'Decorator', icon: '🎈' },
  { id: 'games', name: 'Game Host', icon: '🎮' },
  { id: 'music', name: 'DJ / Music', icon: '🎵' }
];
