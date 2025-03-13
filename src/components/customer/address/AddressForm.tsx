
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AddressFormValues } from './AddressTypes';

interface AddressFormProps {
  initialValues?: AddressFormValues;
  onSave: (addressData: AddressFormValues) => void;
  onCancel: () => void;
  title: string;
  submitLabel: string;
}

const AddressForm = ({
  initialValues = {
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  },
  onSave,
  onCancel,
  title,
  submitLabel
}: AddressFormProps) => {
  const [addressData, setAddressData] = useState<AddressFormValues>(initialValues);

  const handleSubmit = () => {
    // Basic validation
    if (!addressData.name || !addressData.street || !addressData.city || 
        !addressData.state || !addressData.zipCode) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSave(addressData);
  };

  return (
    <Card className="mb-6 border-dashed">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Address Name</label>
            <Input 
              placeholder="e.g., Home, Work, etc." 
              value={addressData.name}
              onChange={(e) => setAddressData({ ...addressData, name: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Street Address</label>
            <Input 
              placeholder="Street address" 
              value={addressData.street}
              onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <Input 
              placeholder="City" 
              value={addressData.city}
              onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State/Province</label>
            <Input 
              placeholder="State/Province" 
              value={addressData.state}
              onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ZIP/Postal Code</label>
            <Input 
              placeholder="ZIP/Postal Code" 
              value={addressData.zipCode}
              onChange={(e) => setAddressData({ ...addressData, zipCode: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <Input 
              placeholder="Country" 
              value={addressData.country}
              onChange={(e) => setAddressData({ ...addressData, country: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {submitLabel === "Save Changes" ? (
              <Check className="h-4 w-4 mr-1" />
            ) : (
              <Plus className="h-4 w-4 mr-1" />
            )}
            {submitLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressForm;
