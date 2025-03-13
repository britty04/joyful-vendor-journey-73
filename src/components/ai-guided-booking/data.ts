
// Define the event type interface
export interface EventType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

// Define the service interface
export interface Service {
  id: string;
  name: string;
  icon: string;
}

// Event types
export const eventTypes = [
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
export const birthdayPrimaryServices = [
  { id: 'magician', name: 'Magician', icon: '🎩' },
  { id: 'clown', name: 'Clown', icon: '🤡' },
  { id: 'catering', name: 'Catering', icon: '🍰' },
  { id: 'venue', name: 'Venue', icon: '🏰' },
  { id: 'photographer', name: 'Photographer', icon: '📷' },
  { id: 'decorator', name: 'Decorator', icon: '🎈' },
  { id: 'games', name: 'Game Host', icon: '🎮' },
  { id: 'music', name: 'DJ / Music', icon: '🎵' }
];
