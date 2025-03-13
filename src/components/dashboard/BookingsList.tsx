
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  X, 
  Check, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  Users, 
  Info,
  Bell
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from "@/components/ui/card";

// Mock booking data with addresses
const MOCK_BOOKINGS = [
  {
    id: "1",
    customerName: "Jane Smith",
    customerPhone: "555-123-4567",
    customerEmail: "jane.smith@example.com",
    eventType: "Kids Birthday",
    date: "2023-11-15",
    time: "2:00 PM",
    endTime: "5:00 PM",
    guests: 20,
    status: "pending",
    amount: 350,
    address: "123 Pine Street, Springfield, IL 62704",
    notes: "Theme is superhero. Please arrive 30 minutes early for setup."
  },
  {
    id: "2",
    customerName: "Michael Johnson",
    customerPhone: "555-987-6543",
    customerEmail: "michael.johnson@example.com",
    eventType: "Corporate Event",
    date: "2023-11-22",
    time: "5:30 PM",
    endTime: "9:30 PM",
    guests: 50,
    status: "confirmed",
    amount: 1200,
    address: "555 Corporate Plaza, Chicago, IL 60601",
    notes: "Annual company dinner. Smart casual dress code."
  },
  {
    id: "3",
    customerName: "Emily Brown",
    customerPhone: "555-456-7890",
    customerEmail: "emily.brown@example.com",
    eventType: "Wedding",
    date: "2023-12-10",
    time: "3:00 PM",
    endTime: "10:00 PM",
    guests: 100,
    status: "confirmed",
    amount: 2500,
    address: "789 Willow Lane, Oak Park Wedding Venue, Springfield, IL 62701",
    notes: "Rustic theme. Coordinator contact: Sarah (555-111-2222)"
  },
  {
    id: "4",
    customerName: "Robert Davis",
    customerPhone: "555-222-3333",
    customerEmail: "robert.davis@example.com",
    eventType: "Kids Birthday",
    date: "2023-11-30",
    time: "1:00 PM",
    endTime: "4:00 PM",
    guests: 15,
    status: "pending",
    amount: 300,
    address: "456 Maple Avenue, Apartment 3B, Springfield, IL 62704",
    notes: "Dinosaur theme. Child is allergic to peanuts."
  },
  {
    id: "5",
    customerName: "Sarah Wilson",
    customerPhone: "555-888-9999",
    customerEmail: "sarah.wilson@example.com",
    eventType: "Corporate Event",
    date: "2023-12-05",
    time: "10:00 AM",
    endTime: "2:00 PM",
    guests: 30,
    status: "canceled",
    amount: 800,
    address: "100 Business Center, Conference Room A, Chicago, IL 60602",
    notes: "Product launch event. AV equipment will be provided."
  }
];

type Booking = typeof MOCK_BOOKINGS[0];
type BookingStatus = 'pending' | 'confirmed' | 'canceled';

const BookingsList = () => {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [filteredStatus, setFilteredStatus] = useState<BookingStatus | 'all'>('all');
  const [reminders, setReminders] = useState<{[key: string]: boolean}>({});

  // Function to check for upcoming events and set reminders
  useEffect(() => {
    const checkUpcomingEvents = () => {
      const now = new Date();
      
      bookings.filter(booking => booking.status === 'confirmed').forEach(booking => {
        const eventDate = new Date(`${booking.date} ${booking.time}`);
        const timeDiff = eventDate.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        // Set reminders for events happening within 3 hours
        if (hoursDiff > 0 && hoursDiff <= 3 && !reminders[booking.id]) {
          setReminders(prev => ({ ...prev, [booking.id]: true }));
          
          // Show a reminder notification
          toast({
            title: `Upcoming Event Reminder`,
            description: `${booking.eventType} at ${booking.address} in ${Math.floor(hoursDiff)} hours and ${Math.floor((hoursDiff % 1) * 60)} minutes`,
            variant: "default",
          });
        }
      });
    };
    
    // Check immediately and then every 30 minutes
    checkUpcomingEvents();
    const intervalId = setInterval(checkUpcomingEvents, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [bookings, reminders]);

  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
    
    const statusMessages = {
      confirmed: "Booking confirmed successfully!",
      canceled: "Booking has been canceled.",
      pending: "Booking has been marked as pending."
    };
    
    toast({
      title: "Status Updated",
      description: statusMessages[newStatus]
    });
  };

  const handleReschedule = (booking: Booking) => {
    setSelectedBooking(booking);
    setNewDate(booking.date);
    setNewTime(booking.time);
    setIsRescheduleOpen(true);
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const saveReschedule = () => {
    if (!selectedBooking) return;
    
    setBookings(bookings.map(booking => 
      booking.id === selectedBooking.id 
        ? { ...booking, date: newDate, time: newTime } 
        : booking
    ));
    
    toast({
      title: "Booking Rescheduled",
      description: `Event rescheduled to ${newDate} at ${newTime}`
    });
    
    setIsRescheduleOpen(false);
  };

  const filteredBookings = filteredStatus === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filteredStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Manage Bookings</h2>
        
        <div className="flex gap-2">
          <Button 
            variant={filteredStatus === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilteredStatus('all')}
          >
            All
          </Button>
          <Button 
            variant={filteredStatus === 'pending' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilteredStatus('pending')}
          >
            <span className="relative">
              Pending
              {bookings.filter(b => b.status === 'pending').length > 0 && (
                <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {bookings.filter(b => b.status === 'pending').length}
                </span>
              )}
            </span>
          </Button>
          <Button 
            variant={filteredStatus === 'confirmed' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilteredStatus('confirmed')}
          >
            Confirmed
          </Button>
          <Button 
            variant={filteredStatus === 'canceled' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilteredStatus('canceled')}
          >
            Canceled
          </Button>
        </div>
      </div>

      {/* Pending Bookings Highlight Card */}
      {bookings.filter(b => b.status === 'pending').length > 0 && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="mr-4 bg-amber-100 rounded-full p-2">
                <Bell className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-800">
                  You have {bookings.filter(b => b.status === 'pending').length} pending booking{bookings.filter(b => b.status === 'pending').length > 1 ? 's' : ''}
                </h3>
                <p className="text-amber-600">
                  Review and confirm these bookings to secure your schedule.
                </p>
              </div>
              <Button 
                className="ml-auto"
                onClick={() => setFilteredStatus('pending')}
              >
                Review Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id} className={booking.status === 'pending' ? 'bg-amber-50' : ''}>
                  <TableCell className="font-medium">{booking.customerName}</TableCell>
                  <TableCell>{booking.eventType}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                      <span className="text-gray-500 text-xs">{booking.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 text-gray-500 mr-1" />
                      <span className="text-xs truncate max-w-[120px]" title={booking.address}>
                        {booking.address.split(',')[0]}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 text-gray-500 mr-1" />
                      <span>{booking.guests}</span>
                    </div>
                  </TableCell>
                  <TableCell>${booking.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewDetails(booking)}
                      >
                        <Info className="h-4 w-4 text-blue-500" />
                        <span className="sr-only">Details</span>
                      </Button>
                      
                      {booking.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600"
                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          >
                            <Check className="h-4 w-4 text-white" />
                            <span className="sr-only">Confirm</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0 border-red-200 text-red-500 hover:bg-red-50"
                            onClick={() => handleStatusChange(booking.id, 'canceled')}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Cancel</span>
                          </Button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleReschedule(booking)}
                          >
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="sr-only">Reschedule</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0 border-red-200 text-red-500 hover:bg-red-50"
                            onClick={() => handleStatusChange(booking.id, 'canceled')}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Cancel</span>
                          </Button>
                        </>
                      )}
                      {booking.status === 'canceled' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleStatusChange(booking.id, 'pending')}
                        >
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          <span className="sr-only">Reactivate</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Reschedule Dialog */}
      <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Booking</DialogTitle>
            <DialogDescription>
              Update the date and time for this booking.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="date" className="text-sm font-medium">
                New Date
              </label>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                <Input
                  id="date"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="time" className="text-sm font-medium">
                New Time
              </label>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <Input
                  id="time"
                  type="time"
                  value={newTime.split(' ')[0]}
                  onChange={(e) => {
                    // Convert 24h format to 12h format for display
                    const timeStr = e.target.value;
                    const [hours, minutes] = timeStr.split(':');
                    const hour = parseInt(hours, 10);
                    const ampm = hour >= 12 ? 'PM' : 'AM';
                    const hour12 = hour % 12 || 12;
                    setNewTime(`${hour12}:${minutes} ${ampm}`);
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRescheduleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveReschedule}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Complete information about this booking
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="py-4">
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedBooking.eventType}</h3>
                  <p className="text-muted-foreground">{selectedBooking.customerName}</p>
                </div>
                <StatusBadge status={selectedBooking.status} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Date & Time</h4>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <p>{new Date(selectedBooking.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <p>{selectedBooking.time} - {selectedBooking.endTime}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                    <p className="text-sm">{selectedBooking.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Guests</h4>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <p>{selectedBooking.guests} people</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Amount</h4>
                  <p className="font-semibold">${selectedBooking.amount}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Customer ID</h4>
                  <p>#{selectedBooking.id}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Contact Information</h4>
                <p className="text-sm">📧 {selectedBooking.customerEmail}</p>
                <p className="text-sm">📞 {selectedBooking.customerPhone}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Notes</h4>
                <p className="text-sm bg-gray-50 p-3 rounded-md">{selectedBooking.notes}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedBooking && selectedBooking.status === 'pending' && (
              <>
                <Button 
                  variant="default" 
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    handleStatusChange(selectedBooking.id, 'confirmed');
                    setIsDetailsOpen(false);
                  }}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Confirm Booking
                </Button>
                <Button 
                  variant="outline"
                  className="border-red-200 text-red-500 hover:bg-red-50"
                  onClick={() => {
                    handleStatusChange(selectedBooking.id, 'canceled');
                    setIsDetailsOpen(false);
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Decline
                </Button>
              </>
            )}
            {selectedBooking && selectedBooking.status === 'confirmed' && (
              <>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsDetailsOpen(false);
                    handleReschedule(selectedBooking);
                  }}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Reschedule
                </Button>
                <Button 
                  variant="outline"
                  className="border-red-200 text-red-500 hover:bg-red-50"
                  onClick={() => {
                    handleStatusChange(selectedBooking.id, 'canceled');
                    setIsDetailsOpen(false);
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel Booking
                </Button>
              </>
            )}
            <Button 
              variant="outline" 
              onClick={() => setIsDetailsOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    pending: { label: "Pending", variant: "outline" },
    confirmed: { label: "Confirmed", variant: "default" },
    canceled: { label: "Canceled", variant: "destructive" }
  } as const;
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  
  return (
    <Badge variant={config.variant as "outline" | "default" | "destructive"}>
      {config.label}
    </Badge>
  );
};

export default BookingsList;
