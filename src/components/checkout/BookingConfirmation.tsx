
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, MapPin, CreditCard, Download, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookingConfirmationProps {
  orderNumber: string;
  bookingDate: Date;
  services: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
  venue?: string;
  paymentMethod: string;
  totalAmount: number;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  orderNumber,
  bookingDate,
  services,
  venue,
  paymentMethod,
  totalAmount,
}) => {
  const navigate = useNavigate();
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert('Receipt download functionality would be implemented here');
  };
  
  const handleShareBooking = () => {
    // In a real app, this would open a share dialog
    if (navigator.share) {
      navigator.share({
        title: 'My EventHive Booking',
        text: `I've booked services for my event on ${formatDate(bookingDate)}!`,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      alert('Share functionality would be implemented here');
    }
  };

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">
            Your booking has been confirmed and your services are scheduled.
          </p>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div>
                <h2 className="font-semibold text-lg">Booking #{orderNumber}</h2>
                <p className="text-sm text-gray-500">Please keep this reference number for your records</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleDownloadReceipt}>
                  <Download className="w-4 h-4 mr-1" />
                  Receipt
                </Button>
                <Button size="sm" variant="outline" onClick={handleShareBooking}>
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  Event Details
                </h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Date:</span> {formatDate(bookingDate)}</p>
                  {venue && (
                    <p>
                      <span className="font-medium">Venue:</span> {venue}
                      <MapPin className="w-4 h-4 inline ml-1 text-gray-500" />
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-primary" />
                  Payment Information
                </h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Payment Method:</span> {paymentMethod}</p>
                  <p>
                    <span className="font-medium">Total Amount:</span> 
                    <span className="text-primary font-semibold"> ₹{totalAmount.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-3">Booked Services</h3>
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {service.quantity}</p>
                    </div>
                    <div className="text-primary">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            You will receive a confirmation email shortly with all booking details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/')}>
              Return to Home
            </Button>
            <Button variant="outline" onClick={() => navigate('/customer/profile')}>
              Manage Bookings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
