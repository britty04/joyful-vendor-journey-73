
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Home, MapPin, Edit2, Trash2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Address } from './AddressTypes';
import AddressForm from './AddressForm';

interface AddressCardProps {
  address: Address;
  onEdit: (id: string, addressData: any) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

const AddressCard = ({ 
  address, 
  onEdit, 
  onDelete, 
  onSetDefault 
}: AddressCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveEdit = (addressData: any) => {
    onEdit(address.id, addressData);
    setIsEditing(false);
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <AddressForm
        initialValues={{
          name: address.name,
          street: address.street,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          country: address.country,
        }}
        onSave={handleSaveEdit}
        onCancel={handleCancelEditing}
        title="Edit Address"
        submitLabel="Save Changes"
      />
    );
  }

  return (
    <Card className={`overflow-hidden ${address.isDefault ? 'border-primary' : ''}`}>
      <div className="p-4">
        {address.isDefault && (
          <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-sm inline-block mb-2">
            Default
          </div>
        )}
        
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
            <Button size="sm" variant="outline" onClick={() => onSetDefault(address.id)}>
              <MapPin className="h-4 w-4 mr-1" />
              Set as Default
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={handleStartEditing}>
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="outline" className="text-destructive" onClick={() => onDelete(address.id)}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AddressCard;
