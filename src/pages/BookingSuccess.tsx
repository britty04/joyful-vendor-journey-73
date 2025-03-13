
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LayoutWithTerms from '@/components/LayoutWithTerms';
import BookingConfirmation from '@/components/checkout/BookingConfirmation';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails || null;

  // If there's no booking details (e.g., direct navigation to /booking/success),
  // redirect to homepage
  useEffect(() => {
    if (!bookingDetails) {
      navigate('/');
    }
  }, [bookingDetails, navigate]);

  // Use local storage as fallback if state is lost
  useEffect(() => {
    if (!bookingDetails) {
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
    }
    return null;
  }, [bookingDetails]);

  if (!bookingDetails) {
    return (
      <LayoutWithTerms>
        <div className="container mx-auto py-8 px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">Booking Information Not Found</h1>
          <p className="mb-6">We couldn't find details for your booking.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Return to Home
          </button>
        </div>
      </LayoutWithTerms>
    );
  }

  return (
    <LayoutWithTerms>
      <div className="container mx-auto">
        <BookingConfirmation 
          orderNumber={bookingDetails.orderNumber}
          bookingDate={new Date(bookingDetails.bookingDate)}
          services={bookingDetails.services}
          venue={bookingDetails.venue}
          paymentMethod={bookingDetails.paymentMethod}
          totalAmount={bookingDetails.totalAmount}
        />
      </div>
    </LayoutWithTerms>
  );
};

export default BookingSuccess;
