
import { PaymentDetails } from "@/components/checkout/PaymentForm";

export interface BookingDetail {
  orderNumber: string;
  bookingDate: Date;
  services: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
  venue: string;
  paymentMethod: string;
  totalAmount: number;
}

export function generateBookingDetails(
  cartItems: any[],
  totalAmount: number,
  paymentDetails: PaymentDetails | null,
  selectedPaymentMethod: string | null
): BookingDetail {
  const paymentMethodName = paymentDetails 
    ? `Card ending in ${paymentDetails.lastFour}`
    : selectedPaymentMethod === 'upi1'
      ? 'UPI Payment'
      : selectedPaymentMethod === 'cash1'
        ? 'Cash on Delivery'
        : 'Credit/Debit Card';

  return {
    orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
    bookingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Event date a week from now
    services: cartItems.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity
    })),
    venue: "Customer's Selected Address",
    paymentMethod: paymentMethodName,
    totalAmount: totalAmount
  };
}
