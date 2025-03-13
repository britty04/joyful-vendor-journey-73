
import { useState } from 'react';
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
import { Calendar, X, Check, Clock, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock booking data
const MOCK_BOOKINGS = [
  {
    id: "1",
    customerName: "Jane Smith",
    eventType: "Kids Birthday",
    date: "2023-11-15",
    time: "2:00 PM",
    guests: 20,
    status: "pending",
    amount: 350
  },
  {
    id: "2",
    customerName: "Michael Johnson",
    eventType: "Corporate Event",
    date: "2023-11-22",
    time: "5:30 PM",
    guests: 50,
    status: "confirmed",
    amount: 1200
  },
  {
    id: "3",
    customerName: "Emily Brown",
    eventType: "Wedding",
    date: "2023-12-10",
    time: "3:00 PM",
    guests: 100,
    status: "confirmed",
    amount: 2500
  },
  {
    id: "4",
    customerName: "Robert Davis",
    eventType: "Kids Birthday",
    date: "2023-11-30",
    time: "1:00 PM",
    guests: 15,
    status: "pending",
    amount: 300
  },
  {
    id: "5",
    customerName: "Sarah Wilson",
    eventType: "Corporate Event",
    date: "2023-12-05",
    time: "10:00 AM",
    guests: 30,
    status: "canceled",
    amount: 800
  }
];

type Booking = typeof MOCK_BOOKINGS[0];
type BookingStatus = 'pending' | 'confirmed' | 'canceled';

const BookingsList = () => {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [filteredStatus, setFilteredStatus] = useState<BookingStatus | 'all'>('all');

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
    <div className="space-y-4">
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
            Pending
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.customerName}</TableCell>
                  <TableCell>{booking.eventType}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                      <span className="text-gray-500 text-xs">{booking.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>{booking.guests}</TableCell>
                  <TableCell>${booking.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          >
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="sr-only">Confirm</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleStatusChange(booking.id, 'canceled')}
                          >
                            <X className="h-4 w-4 text-red-500" />
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
                            className="h-8 w-8 p-0"
                            onClick={() => handleStatusChange(booking.id, 'canceled')}
                          >
                            <X className="h-4 w-4 text-red-500" />
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
