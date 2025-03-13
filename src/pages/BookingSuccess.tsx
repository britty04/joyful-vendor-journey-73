
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LayoutWithTerms from '@/components/LayoutWithTerms';
import BookingConfirmation from '@/components/checkout/BookingConfirmation';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  
  useEffect(() => {
    // Check if we have booking details in location state
    if (location.state?.bookingDetails) {
      setBookingDetails(location.state.bookingDetails);
    } else {
      // If no booking details, check local storage
      const savedBooking = localStorage.getItem('lastBooking');
      if (savedBooking) {
        try {
          const parsedBooking = JSON.parse(savedBooking);
          // Convert date string back to Date object
          parsedBooking.bookingDate = new Date(parsedBooking.bookingDate);
          setBookingDetails(parsedBooking);
        } catch (error) {
          console.error('Failed to parse booking from localStorage', error);
        }
      }
    }
  }, [location]);

  // If no booking details are found, show a fallback UI
  if (!bookingDetails) {
    return (
      <LayoutWithTerms>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-gray-100 p-8 rounded-full inline-block mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Booking Information Not Found</h1>
            <p className="text-gray-600 mb-8">
              We couldn't locate your booking details. This could happen if you've refreshed the page or accessed it directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/')}>
                Return to Home
              </Button>
              <Button variant="outline" onClick={() => navigate('/customer/profile')}>
                View Your Bookings
              </Button>
            </div>
          </div>
        </div>
      </LayoutWithTerms>
    );
  }

  return (
    <LayoutWithTerms>
      <BookingConfirmation 
        orderNumber={bookingDetails.orderNumber}
        bookingDate={bookingDetails.bookingDate}
        services={bookingDetails.services}
        venue={bookingDetails.venue}
        paymentMethod={bookingDetails.paymentMethod}
        totalAmount={bookingDetails.totalAmount}
      />
    </LayoutWithTerms>
  );
};

export default BookingSuccess;
