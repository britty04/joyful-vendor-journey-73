
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Recommendation {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
}

interface LastMinuteRecommendationsProps {
  eventType: string;
}

const LastMinuteRecommendations: React.FC<LastMinuteRecommendationsProps> = ({ eventType }) => {
  // Different recommendations based on event type
  const weddingRecommendations: Recommendation[] = [
    {
      id: 'w1',
      name: 'Same-Day Edit Video',
      description: 'Get a highlights video of your ceremony to share at the reception',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8
    },
    {
      id: 'w2',
      name: 'Wedding Sparklers',
      description: 'Create magical moments with premium sparklers for your send-off',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1564021114829-3f2f8b5ea449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7
    },
    {
      id: 'w3',
      name: 'Bridal Touch-up Kit',
      description: 'Essential makeup items for quick touch-ups throughout your big day',
      price: 2000,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9
    }
  ];
  
  const birthdayRecommendations: Recommendation[] = [
    {
      id: 'b1',
      name: 'Polaroid Camera Rental',
      description: 'Capture instant memories with a Polaroid camera and 20 films',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.6
    },
    {
      id: 'b2',
      name: 'Party Favors Pack',
      description: 'Premium party favors for all your guests (20 packs)',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.5
    },
    {
      id: 'b3',
      name: 'Dessert Station Add-on',
      description: 'Add a premium dessert station with 5 varieties of desserts',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9
    }
  ];
  
  const recommendations = eventType.includes('wedding') ? weddingRecommendations : birthdayRecommendations;
  
  const handleAddToCart = (item: Recommendation) => {
    toast({
      title: "Added to your order",
      description: `${item.name} has been added to your order.`,
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {recommendations.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="h-40 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{item.name}</h3>
              <div className="flex items-center text-amber-500">
                <Star className="fill-amber-500 w-4 h-4" />
                <span className="text-sm ml-1">{item.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {item.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="font-semibold">₹{item.price.toLocaleString()}</span>
              <Button 
                size="sm"
                onClick={() => handleAddToCart(item)}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LastMinuteRecommendations;
