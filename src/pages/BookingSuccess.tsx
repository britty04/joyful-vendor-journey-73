
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LayoutWithTerms from '@/components/LayoutWithTerms';
import BookingConfirmation from '@/components/checkout/BookingConfirmation';
import ManageBookingButton from '@/components/customer/ManageBookingButton';
import { Button } from '@/components/ui/button';
import { Home, MapPin } from 'lucide-react';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails || null;

  // If there's no booking details (e.g., direct navigation to /booking/success),
  // redirect to homepage
  useEffect(() => {
    if (!bookingDetails) {
      // Try to get from localStorage before redirecting
      const lastBooking = localStorage.getItem('lastBooking');
      if (!lastBooking) {
        navigate('/');
      }
    }
  }, [bookingDetails, navigate]);

  // Use local storage as fallback if state is lost
  const getBookingDetails = () => {
    if (bookingDetails) return bookingDetails;

    const lastBooking = localStorage.getItem('lastBooking');
    if (lastBooking) {
      try {
        const parsedBooking = JSON.parse(lastBooking);
        // Ensure dates are properly converted back to Date objects
        if (parsedBooking.bookingDate) {
          parsedBooking.bookingDate = new Date(parsedBooking.bookingDate);
        }
        return parsedBooking;
      } catch (error) {
        console.error('Error parsing booking from localStorage', error);
      }
    }
    return null;
  };

  const currentBookingDetails = getBookingDetails();

  if (!currentBookingDetails) {
    return (
      <LayoutWithTerms>
        <div className="container mx-auto py-8 px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">Booking Information Not Found</h1>
          <p className="mb-6">We couldn't find details for your booking.</p>
          <Button 
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
        </div>
      </LayoutWithTerms>
    );
  }

  return (
    <LayoutWithTerms>
      <div className="container mx-auto">
        <BookingConfirmation 
          orderNumber={currentBookingDetails.orderNumber}
          bookingDate={new Date(currentBookingDetails.bookingDate)}
          services={currentBookingDetails.services}
          venue={currentBookingDetails.venue}
          paymentMethod={currentBookingDetails.paymentMethod}
          totalAmount={currentBookingDetails.totalAmount}
        />
        
        <div className="text-center mt-6 mb-12">
          <p className="text-gray-600 mb-4">You can view and manage all your bookings in your profile</p>
          <div className="flex flex-wrap justify-center gap-3">
            <ManageBookingButton />
            <ManageBookingButton 
              variant="outline" 
              tab="address" 
            />
          </div>
        </div>
      </div>
    </LayoutWithTerms>
  );
};

export default BookingSuccess;
