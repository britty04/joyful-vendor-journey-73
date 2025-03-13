import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  Music,
  Film,
  Theater,
  Users,
  Search,
  ChevronRight,
  Filter,
  Star,
  Heart
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  image: string;
  category: string;
  price: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
}

const TicketingEvents = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Mumbai Music Festival",
      date: "Jun 15, 2023",
      time: "6:00 PM",
      location: "Mumbai, Maharashtra",
      venue: "Marine Drive Amphitheater",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      category: "music",
      price: "₹1,200",
      rating: 4.8,
      reviewCount: 127,
      isFeatured: true
    },
    {
      id: "2",
      title: "Delhi Comedy Night",
      date: "Jun 22, 2023",
      time: "8:00 PM",
      location: "Delhi, NCR",
      venue: "The Laugh Factory",
      image: "https://images.unsplash.com/photo-1515168985863-8022bec9f2d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      category: "comedy",
      price: "₹800",
      rating: 4.5,
      reviewCount: 89,
      isFeatured: false
    },
    {
      id: "3",
      title: "Bangalore Art Exhibition",
      date: "Jul 5, 2023",
      time: "10:00 AM",
      location: "Bangalore, Karnataka",
      venue: "National Gallery of Modern Art",
      image: "https://images.unsplash.com/photo-1594784205624-80e9c0aae25c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      category: "art",
      price: "₹350",
      rating: 4.6,
      reviewCount: 104,
      isFeatured: false
    },
    {
      id: "4",
      title: "Chennai Classical Dance Festival",
      date: "Jul 12, 2023",
      time: "7:00 PM",
      location: "Chennai, Tamil Nadu",
      venue: "Music Academy",
      image: "https://images.unsplash.com/photo-1545236771-8c5e0e15f777?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      category: "dance",
      price: "₹500",
      rating: 4.9,
      reviewCount: 156,
      isFeatured: true
    },
    {
      id: "5",
      title: "Hyderabad Film Festival",
      date: "Jul 18, 2023",
      time: "5:00 PM",
      location: "Hyderabad, Telangana",
      venue: "Prasad's IMAX",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      category: "film",
      price: "₹650",
      rating: 4.7,
      reviewCount: 118,
      isFeatured: false
    },
    {
      id: "6",
      title: "Pune Theater Festival",
      date: "Jul 25, 2023",
      time: "6:30 PM",
      location: "Pune, Maharashtra",
      venue: "Balgandharva Rangmandir",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      category: "theater",
      price: "₹450",
      rating: 4.6,
      reviewCount: 92,
      isFeatured: false
    }
  ]);
  
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "music":
        return <Music className="h-5 w-5" />;
      case "film":
      case "cinema":
        return <Film className="h-5 w-5" />;
      case "theater":
      case "comedy":
        return <Theater className="h-5 w-5" />;
      default:
        return <Ticket className="h-5 w-5" />;
    }
  };
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    
    if (!favorites.includes(id)) {
      toast({
        title: "Added to favorites",
        description: "Event has been added to your favorites.",
      });
    }
  };
  
  const handleBuyTicket = (event: Event) => {
    toast({
      title: "Redirecting to checkout",
      description: `You're purchasing tickets for ${event.title}`,
    });
  };
  
  const filteredEvents = events.filter(event => {
    const matchesCategory = filter === "all" || event.category === filter;
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  const featuredEvents = events.filter(event => event.isFeatured);
  
  const isFullPage = window.location.pathname.includes('events');
  
  if (!isFullPage) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Button variant="outline" size="sm" asChild>
            <Link to="/events">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.slice(0, 3).map(event => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    favorites.includes(event.id) 
                      ? 'bg-white text-red-500 shadow-md' 
                      : 'bg-black/30 text-white hover:bg-white hover:text-gray-900'
                  }`}
                  onClick={() => toggleFavorite(event.id)}
                >
                  <Heart size={16} fill={favorites.includes(event.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <CardHeader className="py-4">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {event.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pb-4 pt-0">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 pb-4 flex justify-between items-center">
                <div className="font-bold text-lg text-primary">{event.price}</div>
                <Button onClick={() => handleBuyTicket(event)}>
                  Buy Tickets
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-eventPurple-50/50 to-white">
      <div className="relative rounded-2xl overflow-hidden mb-12 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-eventPink-600/90 mix-blend-multiply"></div>
        <div 
          className="relative bg-cover bg-center h-80"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}
        >
          <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium text-sm mb-4">
                <Ticket className="h-4 w-4" />
                <span>Curated Events</span>
              </div>
              <h1 className="text-4xl font-bold mb-4 drop-shadow-md">Discover Amazing Events Near You</h1>
              <p className="text-lg mb-6 max-w-xl text-white/90">
                Find and book tickets to the most exclusive concerts, performances, and experiences in your city.
              </p>
              <div className="relative max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events by name or city..."
                  className="pl-10 pr-4 py-3 w-full rounded-lg bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Events</h2>
          <Button variant="outline" size="sm" asChild>
            <Link to="#featured">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredEvents.map(event => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group playful-card hover:playful-shadow">
              <div className="relative aspect-[2/1] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-primary/90 backdrop-blur-sm p-2 rounded-full mr-2">
                        {getCategoryIcon(event.category)}
                      </div>
                      <span className="text-sm font-medium capitalize">{event.category}</span>
                    </div>
                    <div className="flex items-center bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-sm">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span>{event.rating}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    favorites.includes(event.id) 
                      ? 'bg-white text-red-500 shadow-md' 
                      : 'bg-black/30 text-white hover:bg-white hover:text-gray-900'
                  }`}
                  onClick={() => toggleFavorite(event.id)}
                >
                  <Heart size={16} fill={favorites.includes(event.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">{event.title}</h3>
                  <div className="font-bold text-primary">{event.price}</div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{event.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{event.venue}, {event.location}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button className="w-full" onClick={() => handleBuyTicket(event)}>
                  Buy Tickets
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setFilter("all")}
          >
            <Ticket className="mr-2 h-4 w-4" />
            All Events
          </Button>
          <Button
            variant={filter === "music" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setFilter("music")}
          >
            <Music className="mr-2 h-4 w-4" />
            Music
          </Button>
          <Button
            variant={filter === "comedy" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setFilter("comedy")}
          >
            <Theater className="mr-2 h-4 w-4" />
            Comedy
          </Button>
          <Button
            variant={filter === "film" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setFilter("film")}
          >
            <Film className="mr-2 h-4 w-4" />
            Film
          </Button>
          <Button
            variant={filter === "art" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setFilter("art")}
          >
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a.996.996 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96a.996.996 0 0 0 0-1.41z" />
            </svg>
            Art
          </Button>
          <Button
            variant={filter === "theater" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setFilter("theater")}
          >
            <Theater className="mr-2 h-4 w-4" />
            Theater
          </Button>
          <Button
            variant={filter === "dance" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setFilter("dance")}
          >
            <Users className="mr-2 h-4 w-4" />
            Dance
          </Button>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Events</h2>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 inline-flex items-center justify-center mb-4">
              <Ticket className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No events found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button onClick={() => {setFilter("all"); setSearchQuery("")}}>
              View All Events
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group playful-card hover:playful-shadow">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      favorites.includes(event.id) 
                        ? 'bg-white text-red-500 shadow-md' 
                        : 'bg-black/30 text-white hover:bg-white hover:text-gray-900'
                    }`}
                    onClick={() => toggleFavorite(event.id)}
                  >
                    <Heart size={16} fill={favorites.includes(event.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <CardHeader className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={cn(
                        "p-1.5 rounded-full mr-2",
                        event.category === "music" ? "bg-purple-100 text-purple-600" :
                        event.category === "comedy" ? "bg-amber-100 text-amber-600" :
                        event.category === "film" ? "bg-blue-100 text-blue-600" :
                        event.category === "art" ? "bg-pink-100 text-pink-600" :
                        event.category === "theater" ? "bg-emerald-100 text-emerald-600" :
                        "bg-gray-100 text-gray-600"
                      )}>
                        {getCategoryIcon(event.category)}
                      </div>
                      <span className="text-sm font-medium capitalize">{event.category}</span>
                    </div>
                    <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm font-medium">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span>{event.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors mt-2">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pb-4 pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{event.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0 pb-4 flex justify-between items-center">
                  <div className="font-bold text-lg text-primary">{event.price}</div>
                  <Button onClick={() => handleBuyTicket(event)}>
                    Buy Tickets
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketingEvents;
