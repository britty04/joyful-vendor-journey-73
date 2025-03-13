
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Plus, MapPin, Edit2, Trash2, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const CustomerAddressManager = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  
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

  const addAddress = () => {
    // Basic validation
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newAddressEntry: Address = {
      id: (addresses.length + 1).toString(),
      ...newAddress,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddressEntry]);
    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
    });
    setShowAddForm(false);
    
    toast({
      title: "Address Added",
      description: "Your new address has been added successfully.",
    });
  };

  const startEditingAddress = (address: Address) => {
    setEditingAddressId(address.id);
    setNewAddress({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    });
    setShowAddForm(false);
  };

  const saveEditedAddress = (id: string) => {
    // Basic validation
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setAddresses(addresses.map(addr => 
      addr.id === id ? { ...addr, ...newAddress } : addr
    ));
    setEditingAddressId(null);
    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
    });
    
    toast({
      title: "Address Updated",
      description: "Your address has been updated successfully.",
    });
  };

  const cancelEditing = () => {
    setEditingAddressId(null);
    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
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
            <Card className="mb-6 border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">Add New Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Address Name</label>
                    <Input 
                      placeholder="e.g., Home, Work, etc." 
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Street Address</label>
                    <Input 
                      placeholder="Street address" 
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <Input 
                      placeholder="City" 
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State/Province</label>
                    <Input 
                      placeholder="State/Province" 
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP/Postal Code</label>
                    <Input 
                      placeholder="ZIP/Postal Code" 
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <Input 
                      placeholder="Country" 
                      value={newAddress.country}
                      onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addAddress}>
                    Save Address
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <Card key={address.id} className={`overflow-hidden ${address.isDefault ? 'border-primary' : ''}`}>
                <div className="p-4">
                  {address.isDefault && (
                    <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-sm inline-block mb-2">
                      Default
                    </div>
                  )}
                  
                  {editingAddressId === address.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Address Name</label>
                          <Input 
                            placeholder="e.g., Home, Work, etc." 
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Street Address</label>
                          <Input 
                            placeholder="Street address" 
                            value={newAddress.street}
                            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-sm font-medium mb-1">City</label>
                            <Input 
                              placeholder="City" 
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">State</label>
                            <Input 
                              placeholder="State" 
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-sm font-medium mb-1">ZIP/Postal Code</label>
                            <Input 
                              placeholder="ZIP Code" 
                              value={newAddress.zipCode}
                              onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Country</label>
                            <Input 
                              placeholder="Country" 
                              value={newAddress.country}
                              onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <Button size="sm" variant="outline" onClick={cancelEditing}>
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => saveEditedAddress(address.id)}>
                          <Check className="h-4 w-4 mr-1" />
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center mb-2">
                        <Home className="h-5 w-5 mr-2 text-muted-foreground" /> 
                        <h3 className="font-semibold">{address.name}</h3>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zipCode}</p>
                        <p>{address.country}</p>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        {!address.isDefault && (
                          <Button size="sm" variant="outline" onClick={() => setDefaultAddress(address.id)}>
                            <MapPin className="h-4 w-4 mr-1" />
                            Set as Default
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => startEditingAddress(address)}>
                          <Edit2 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive" onClick={() => removeAddress(address.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          {addresses.length === 0 && (
            <div className="text-center py-10">
              <MapPin className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Saved Addresses</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                You don't have any saved addresses yet.
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Your First Address
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAddressManager;
