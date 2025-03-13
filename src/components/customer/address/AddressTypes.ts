
export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface AddressFormValues {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
