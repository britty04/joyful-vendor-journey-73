
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Plus, Home, Building2 } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'home' | 'work' | 'other';
}

// Mock saved addresses
const savedAddresses: Address[] = [
  {
    id: '1',
    name: 'Home',
    street: '123 Residency Park',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001',
    type: 'home'
  },
  {
    id: '2',
    name: 'Office',
    street: '456 Tech Park, Whitefield',
    city: 'Bangalore',
    state: 'Karnataka',
    zipCode: '560066',
    type: 'work'
  }
];

interface AddressSelectionProps {
  onSelectAddress: (addressId: string) => void;
  selectedAddress: string | null;
}

const AddressSelection: React.FC<AddressSelectionProps> = ({ 
  onSelectAddress, 
  selectedAddress 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  // Fix: Define the type properly as a union type
  const [newAddress, setNewAddress] = useState<{
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    type: 'home' | 'work' | 'other';
  }>({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    type: 'home'
  });

  const handleAddNewAddress = () => {
    // In a real app, this would save to backend/context
    // Here we'll just simulate adding to the selection
    const newId = `new-${Date.now()}`;
    onSelectAddress(newId);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <RadioGroup 
        value={selectedAddress || undefined} 
        onValueChange={onSelectAddress}
      >
        <div className="space-y-4">
          {savedAddresses.map((address) => (
            <div key={address.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:border-primary transition-colors">
              <RadioGroupItem 
                value={address.id} 
                id={`address-${address.id}`} 
                className="mt-1"
              />
              <div className="flex-grow">
                <div className="flex items-center">
                  {address.type === 'home' ? (
                    <Home className="w-4 h-4 mr-2 text-gray-500" />
                  ) : (
                    <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                  )}
                  <Label 
                    htmlFor={`address-${address.id}`}
                    className="font-medium cursor-pointer"
                  >
                    {address.name}
                  </Label>
                </div>
                
                <div className="text-gray-600 mt-1 text-sm space-y-1">
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add new address option */}
          <div 
            className={`p-4 border border-dashed rounded-lg hover:border-primary transition-colors cursor-pointer ${showAddForm ? 'border-primary bg-primary/5' : ''}`}
            onClick={() => setShowAddForm(true)}
          >
            <div className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium">Add a new address</span>
            </div>
          </div>
        </div>
      </RadioGroup>
      
      {/* New address form */}
      {showAddForm && (
        <div className="mt-6 border rounded-lg p-4 bg-gray-50">
          <h3 className="font-medium mb-4 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Add New Address
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full">
              <Label htmlFor="address-name">Address Name</Label>
              <Input 
                id="address-name" 
                placeholder="e.g., Home, Office, etc."
                value={newAddress.name}
                onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
              />
            </div>
            
            <div className="col-span-full">
              <Label htmlFor="street">Street Address</Label>
              <Textarea 
                id="street" 
                placeholder="Street address, apartment, suite, etc."
                value={newAddress.street}
                onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="state">State</Label>
              <Input 
                id="state" 
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="zipcode">ZIP/Postal Code</Label>
              <Input 
                id="zipcode" 
                placeholder="ZIP/Postal Code"
                value={newAddress.zipCode}
                onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
              />
            </div>
            
            <div>
              <Label>Address Type</Label>
              <div className="flex space-x-4 mt-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="type-home"
                    name="address-type"
                    value="home"
                    checked={newAddress.type === 'home'}
                    onChange={() => setNewAddress({...newAddress, type: 'home'})}
                    className="mr-2"
                  />
                  <Label htmlFor="type-home" className="cursor-pointer">Home</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="type-work"
                    name="address-type"
                    value="work"
                    checked={newAddress.type === 'work'}
                    onChange={() => setNewAddress({...newAddress, type: 'work'})}
                    className="mr-2"
                  />
                  <Label htmlFor="type-work" className="cursor-pointer">Work</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="type-other"
                    name="address-type"
                    value="other"
                    checked={newAddress.type === 'other'}
                    onChange={() => setNewAddress({...newAddress, type: 'other'})}
                    className="mr-2"
                  />
                  <Label htmlFor="type-other" className="cursor-pointer">Other</Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddNewAddress}
              disabled={!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode}
            >
              Save Address
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSelection;
