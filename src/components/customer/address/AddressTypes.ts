
export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  phoneNumber?: string;
  emailAddress?: string;
}

export interface AddressFormValues {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber?: string;
  emailAddress?: string;
}

export interface EventTicket {
  id: string;
  eventId: string;
  eventName: string;
  ticketType: string;
  price: number;
  purchaseDate: Date;
  eventDate: Date;
  venue: string;
  status: 'valid' | 'used' | 'expired' | 'cancelled';
  qrCode?: string;
  seatInfo?: string;
}
