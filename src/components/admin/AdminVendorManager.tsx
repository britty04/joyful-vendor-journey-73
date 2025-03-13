
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Check, X, Edit, Pencil } from 'lucide-react';

// Mock vendor data
const mockVendors = [
  { 
    id: 'v1', 
    name: 'Magic Moments', 
    category: 'Entertainment',
    service: 'Magician',
    price: 6000,
    enabled: true,
    image: 'https://images.unsplash.com/photo-1589123053646-9fa2a86a6e8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'v2', 
    name: 'Clown Around', 
    category: 'Entertainment',
    service: 'Clown',
    price: 4500,
    enabled: true,
    image: 'https://images.unsplash.com/photo-1573747806413-2aef4c8542fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'v3', 
    name: 'Royal Caterers', 
    category: 'Food',
    service: 'Catering',
    price: 12000,
    enabled: true,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'v4', 
    name: 'Palace Venues', 
    category: 'Venue',
    service: 'Venue',
    price: 25000,
    enabled: false,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
];

interface Vendor {
  id: string;
  name: string;
  category: string;
  service: string;
  price: number;
  enabled: boolean;
  image: string;
}

const AdminVendorManager = () => {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [editedPrice, setEditedPrice] = useState<string>('');
  
  const handleEditVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setEditedPrice(vendor.price.toString());
    setIsDialogOpen(true);
  };
  
  const handleSaveVendor = () => {
    if (!selectedVendor) return;
    
    const priceValue = parseFloat(editedPrice);
    if (isNaN(priceValue)) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid number for the price.",
        variant: "destructive"
      });
      return;
    }
    
    setVendors(prev => 
      prev.map(vendor => 
        vendor.id === selectedVendor.id 
          ? { ...vendor, price: priceValue } 
          : vendor
      )
    );
    
    toast({
      title: "Vendor updated",
      description: `${selectedVendor.name}'s price has been updated to ₹${priceValue.toLocaleString()}`,
    });
    
    setIsDialogOpen(false);
  };
  
  const toggleVendorStatus = (vendorId: string) => {
    setVendors(prev => 
      prev.map(vendor => 
        vendor.id === vendorId 
          ? { ...vendor, enabled: !vendor.enabled } 
          : vendor
      )
    );
    
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor) {
      toast({
        title: vendor.enabled ? "Vendor disabled" : "Vendor enabled",
        description: `${vendor.name} has been ${vendor.enabled ? 'disabled' : 'enabled'}.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vendor Management</h2>
        <Button>Add New Vendor</Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img 
                          src={vendor.image} 
                          alt={vendor.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>{vendor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.category}</TableCell>
                  <TableCell>{vendor.service}</TableCell>
                  <TableCell>₹{vendor.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id={`vendor-status-${vendor.id}`}
                        checked={vendor.enabled}
                        onCheckedChange={() => toggleVendorStatus(vendor.id)}
                      />
                      <Label htmlFor={`vendor-status-${vendor.id}`} className="text-sm">
                        {vendor.enabled ? (
                          <span className="text-green-600 flex items-center">
                            <Check className="w-4 h-4 mr-1" /> Enabled
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center">
                            <X className="w-4 h-4 mr-1" /> Disabled
                          </span>
                        )}
                      </Label>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditVendor(vendor)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Vendor Price</DialogTitle>
          </DialogHeader>
          
          {selectedVendor && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md overflow-hidden">
                  <img 
                    src={selectedVendor.image} 
                    alt={selectedVendor.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{selectedVendor.name}</h3>
                  <p className="text-sm text-gray-500">{selectedVendor.service}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vendor-price">Price (₹)</Label>
                <Input
                  id="vendor-price"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                  placeholder="Enter price"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveVendor}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminVendorManager;
