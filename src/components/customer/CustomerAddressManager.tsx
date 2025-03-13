
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AddressCard from './address/AddressCard';
import AddressForm from './address/AddressForm';
import EmptyAddressList from './address/EmptyAddressList';
import { Address, AddressFormValues } from './address/AddressTypes';

const CustomerAddressManager = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Mock data for addresses
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Home',
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'United States',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Work',
      street: '456 Office Park',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States',
      isDefault: false,
    },
    {
      id: '3',
      name: 'Parents',
      street: '789 Family Home',
      city: 'Oakland',
      state: 'CA',
      zipCode: '94610',
      country: 'United States',
      isDefault: false,
    },
  ]);

  const addAddress = (addressData: AddressFormValues) => {
    const newAddressEntry: Address = {
      id: (addresses.length + 1).toString(),
      ...addressData,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddressEntry]);
    setShowAddForm(false);
    
    toast({
      title: "Address Added",
      description: "Your new address has been added successfully.",
    });
  };

  const editAddress = (id: string, addressData: AddressFormValues) => {
    // Basic validation
    if (!addressData.name || !addressData.street || !addressData.city || !addressData.state || !addressData.zipCode) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setAddresses(addresses.map(addr => 
      addr.id === id ? { ...addr, ...addressData } : addr
    ));
    
    toast({
      title: "Address Updated",
      description: "Your address has been updated successfully.",
    });
  };

  const removeAddress = (id: string) => {
    const addressToRemove = addresses.find(addr => addr.id === id);
    setAddresses(addresses.filter(addr => addr.id !== id));
    
    toast({
      title: "Address Removed",
      description: `The address "${addressToRemove?.name}" has been removed.`,
    });
    
    // If the default address was removed, set the first remaining address as default
    if (addressToRemove?.isDefault && addresses.length > 1) {
      const remainingAddresses = addresses.filter(addr => addr.id !== id);
      setAddresses(remainingAddresses.map((addr, index) => 
        index === 0 ? { ...addr, isDefault: true } : addr
      ));
    }
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(addresses.map(addr => 
      ({ ...addr, isDefault: addr.id === id })
    ));
    
    const newDefault = addresses.find(addr => addr.id === id);
    
    toast({
      title: "Default Address Updated",
      description: `"${newDefault?.name}" is now your default address.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Your Addresses</CardTitle>
              <CardDescription>Manage your saved addresses</CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4 mr-1" />
              Add New Address
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <AddressForm
              onSave={addAddress}
              onCancel={() => setShowAddForm(false)}
              title="Add New Address"
              submitLabel="Save Address"
            />
          )}
          
          {addresses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={editAddress}
                  onDelete={removeAddress}
                  onSetDefault={setDefaultAddress}
                />
              ))}
            </div>
          ) : (
            <EmptyAddressList onAddClick={() => setShowAddForm(true)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAddressManager;
