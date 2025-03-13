
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, MapPin, ChevronRight, MoreVertical, Calendar, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  serviceName: string;
  vendorName: string;
  date: string;
  time: string;
  address: string;
  status: 'upcoming' | 'past' | 'cancelled';
  canCancel: boolean;
  canReschedule: boolean;
}

const CustomerBookings = () => {
  // Mock data for bookings
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      serviceName: 'Wedding Photography',
      vendorName: 'Stellar Events & Photography',
      date: '2023-12-15',
      time: '14:00 - 18:00',
      address: '123 Wedding Venue, San Francisco, CA',
      status: 'upcoming',
      canCancel: true,
      canReschedule: true
    },
    {
      id: '2',
      serviceName: 'Birthday Party Entertainment',
      vendorName: 'Magic Moments Entertainment',
      date: '2023-10-22',
      time: '15:00 - 17:00',
      address: '456 Party Hall, San Francisco, CA',
      status: 'upcoming',
      canCancel: true,
      canReschedule: true
    },
    {
      id: '3',
      serviceName: 'Corporate Event Photography',
      vendorName: 'Stellar Events & Photography',
      date: '2023-09-30',
      time: '10:00 - 14:00',
      address: '789 Conference Center, San Francisco, CA',
      status: 'upcoming',
      canCancel: false,
      canReschedule: false
    },
    {
      id: '4',
      serviceName: 'Birthday Cake Delivery',
      vendorName: 'Sweet Delights Bakery',
      date: '2023-09-05',
      time: '12:00',
      address: '123 Home Address, San Francisco, CA',
      status: 'past',
      canCancel: false,
      canReschedule: false
    },
    {
      id: '5',
      serviceName: 'Wedding Flower Arrangements',
      vendorName: 'Bloom Floral Designs',
      date: '2023-08-20',
      time: '09:00',
      address: '123 Wedding Venue, San Francisco, CA',
      status: 'past',
      canCancel: false,
      canReschedule: false
    },
    {
      id: '6',
      serviceName: 'Holiday Party DJ',
      vendorName: 'Elite Sound DJ Services',
      date: '2023-07-15',
      time: '19:00 - 23:00',
      address: '789 Party Hall, San Francisco, CA',
      status: 'cancelled',
      canCancel: false,
      canReschedule: false
    }
  ]);

  const cancelBooking = (id: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'cancelled', canCancel: false, canReschedule: false } : booking
    ));
    
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been successfully cancelled.",
    });
  };

  const rescheduleBooking = (id: string) => {
    // In a real app, this would open a reschedule dialog
    toast({
      title: "Reschedule Booking",
      description: "The reschedule dialog would open here.",
    });
  };

  // Filter bookings by status
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'past');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming
            {upcomingBookings.length > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                {upcomingBookings.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Upcoming Bookings</h3>
                <p className="text-muted-foreground text-center max-w-md mt-2">
                  You don't have any upcoming bookings. Browse vendors to book your next event.
                </p>
                <Button className="mt-4">Browse Vendors</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {upcomingBookings.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  onCancel={cancelBooking}
                  onReschedule={rescheduleBooking}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4">
            {pastBookings.map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                onCancel={cancelBooking}
                onReschedule={rescheduleBooking}
              />
            ))}
            {pastBookings.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Past Bookings</h3>
                  <p className="text-muted-foreground text-center max-w-md mt-2">
                    You don't have any past bookings yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="cancelled" className="space-y-4">
          <div className="grid gap-4">
            {cancelledBookings.map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                onCancel={cancelBooking}
                onReschedule={rescheduleBooking}
              />
            ))}
            {cancelledBookings.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Cancelled Bookings</h3>
                  <p className="text-muted-foreground text-center max-w-md mt-2">
                    You don't have any cancelled bookings.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface BookingCardProps {
  booking: Booking;
  onCancel: (id: string) => void;
  onReschedule: (id: string) => void;
}

const BookingCard = ({ booking, onCancel, onReschedule }: BookingCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-100 text-green-800';
      case 'past':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isUpcomingSoon = booking.status === 'upcoming' && 
    new Date(booking.date).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <Card className="overflow-hidden">
      <div className="border-l-4 border-primary">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
              <p className="text-muted-foreground">{booking.vendorName}</p>
            </div>
            <div className="flex items-center">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{booking.time}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
              <span>{booking.address}</span>
            </div>
          </div>
          
          {isUpcomingSoon && (
            <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-md flex items-start">
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">
                This booking is coming up soon and cannot be cancelled. Please contact the vendor directly for any changes.
              </p>
            </div>
          )}
          
          {booking.status === 'upcoming' && (
            <div className="mt-4 flex gap-2 justify-end">
              {booking.canReschedule && (
                <Button variant="outline" onClick={() => onReschedule(booking.id)}>
                  Reschedule
                </Button>
              )}
              {booking.canCancel && (
                <Button variant="destructive" onClick={() => onCancel(booking.id)}>
                  Cancel Booking
                </Button>
              )}
              <Button>
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
          
          {booking.status === 'past' && (
            <div className="mt-4 flex gap-2 justify-end">
              <Button variant="outline">
                Book Again
              </Button>
              <Button>
                Leave Review
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CustomerBookings;
