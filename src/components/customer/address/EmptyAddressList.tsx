
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from 'lucide-react';

interface EmptyAddressListProps {
  onAddClick: () => void;
}

const EmptyAddressList = ({ onAddClick }: EmptyAddressListProps) => {
  return (
    <div className="text-center py-10">
      <MapPin className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No Saved Addresses</h3>
      <p className="text-muted-foreground mt-1 mb-4">
        You don't have any saved addresses yet.
      </p>
      <Button onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-1" />
        Add Your First Address
      </Button>
    </div>
  );
};

export default EmptyAddressList;
