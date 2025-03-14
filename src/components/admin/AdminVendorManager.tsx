
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
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { Check, X, Edit, Pencil, Calendar as CalendarIcon, Percent, Tag } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock vendor data
const mockVendors = [
  { 
    id: 'v1', 
    name: 'Magic Moments', 
    category: 'Entertainment',
    service: 'Magician',
    price: 6000,
    enabled: true,
    image: 'https://images.unsplash.com/photo-1589123053646-9fa2a86a6e8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    city: 'Mumbai'
  },
  { 
    id: 'v2', 
    name: 'Clown Around', 
    category: 'Entertainment',
    service: 'Clown',
    price: 4500,
    enabled: true,
    image: 'https://images.unsplash.com/photo-1573747806413-2aef4c8542fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    city: 'Delhi'
  },
  { 
    id: 'v3', 
    name: 'Royal Caterers', 
    category: 'Food',
    service: 'Catering',
    price: 12000,
    enabled: true,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    city: 'Bangalore'
  },
  { 
    id: 'v4', 
    name: 'Palace Venues', 
    category: 'Venue',
    service: 'Venue',
    price: 25000,
    enabled: false,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    city: 'Hyderabad'
  },
];

// Mock categories, cities for discount management
const categories = ['Entertainment', 'Food', 'Venue', 'Decoration', 'Photography'];
const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune'];

interface Vendor {
  id: string;
  name: string;
  category: string;
  service: string;
  price: number;
  enabled: boolean;
  image: string;
  city: string;
}

interface VendorDiscount {
  id: string;
  vendorId: string;
  date: Date | null;
  discountPercent: number;
  isMonthly: boolean;
}

interface CategoryDiscount {
  id: string;
  categoryName: string;
  discountPercent: number;
  startDate: Date | null;
  endDate: Date | null;
}

interface CityDiscount {
  id: string;
  cityName: string;
  discountPercent: number;
  startDate: Date | null;
  endDate: Date | null;
}

const AdminVendorManager = () => {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
  const [isDiscountDialogOpen, setIsDiscountDialogOpen] = useState(false);
  const [isAdminDiscountDialogOpen, setIsAdminDiscountDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [editedPrice, setEditedPrice] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [discountPercent, setDiscountPercent] = useState<string>('10');
  const [isMonthlyDiscount, setIsMonthlyDiscount] = useState(false);
  const [discountType, setDiscountType] = useState('vendor');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [adminDiscountPercent, setAdminDiscountPercent] = useState<string>('15');
  const [adminDiscountStartDate, setAdminDiscountStartDate] = useState<Date | null>(new Date());
  const [adminDiscountEndDate, setAdminDiscountEndDate] = useState<Date | null>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  
  const [vendorDiscounts, setVendorDiscounts] = useState<VendorDiscount[]>([
    { id: 'd1', vendorId: 'v1', date: new Date(), discountPercent: 10, isMonthly: false },
    { id: 'd2', vendorId: 'v2', date: null, discountPercent: 15, isMonthly: true }
  ]);
  
  const [categoryDiscounts, setCategoryDiscounts] = useState<CategoryDiscount[]>([
    { 
      id: 'cd1', 
      categoryName: 'Entertainment', 
      discountPercent: 15, 
      startDate: new Date(), 
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) 
    }
  ]);
  
  const [cityDiscounts, setCityDiscounts] = useState<CityDiscount[]>([
    { 
      id: 'cid1', 
      cityName: 'Mumbai', 
      discountPercent: 10, 
      startDate: new Date(), 
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) 
    }
  ]);
  
  const handleEditVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setEditedPrice(vendor.price.toString());
    setIsPriceDialogOpen(true);
  };

  const handleEditDiscount = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    
    // Check if vendor already has a discount
    const existingDiscount = vendorDiscounts.find(d => d.vendorId === vendor.id);
    if (existingDiscount) {
      setDiscountPercent(existingDiscount.discountPercent.toString());
      setSelectedDate(existingDiscount.date);
      setIsMonthlyDiscount(existingDiscount.isMonthly);
    } else {
      setDiscountPercent('10');
      setSelectedDate(null);
      setIsMonthlyDiscount(false);
    }
    
    setIsDiscountDialogOpen(true);
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
    
    setIsPriceDialogOpen(false);
  };
  
  const handleSaveDiscount = () => {
    if (!selectedVendor) return;
    
    const discountValue = parseFloat(discountPercent);
    if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
      toast({
        title: "Invalid discount",
        description: "Please enter a valid discount percentage between 1 and 100.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if this vendor already has a discount
    const existingDiscountIndex = vendorDiscounts.findIndex(
      d => d.vendorId === selectedVendor.id
    );
    
    if (existingDiscountIndex >= 0) {
      // Update existing discount
      setVendorDiscounts(prev => 
        prev.map((discount, index) => 
          index === existingDiscountIndex 
            ? { 
                ...discount, 
                date: isMonthlyDiscount ? null : selectedDate, 
                discountPercent: discountValue,
                isMonthly: isMonthlyDiscount
              } 
            : discount
        )
      );
    } else {
      // Add new discount
      setVendorDiscounts(prev => [
        ...prev,
        {
          id: `d${prev.length + 1}`,
          vendorId: selectedVendor.id,
          date: isMonthlyDiscount ? null : selectedDate,
          discountPercent: discountValue,
          isMonthly: isMonthlyDiscount
        }
      ]);
    }
    
    toast({
      title: "Discount applied",
      description: `${selectedVendor.name} now has a ${discountValue}% discount ${
        isMonthlyDiscount 
          ? 'for the entire month' 
          : selectedDate 
            ? `on ${format(selectedDate, 'MMM dd, yyyy')}` 
            : ''
      }`,
    });
    
    setIsDiscountDialogOpen(false);
  };
  
  const handleSaveAdminDiscount = () => {
    const discountValue = parseFloat(adminDiscountPercent);
    if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
      toast({
        title: "Invalid discount",
        description: "Please enter a valid discount percentage between 1 and 100.",
        variant: "destructive"
      });
      return;
    }
    
    if (!adminDiscountStartDate || !adminDiscountEndDate) {
      toast({
        title: "Missing dates",
        description: "Please select both start and end dates for the discount period.",
        variant: "destructive"
      });
      return;
    }
    
    if (adminDiscountStartDate > adminDiscountEndDate) {
      toast({
        title: "Invalid date range",
        description: "End date must be after start date.",
        variant: "destructive"
      });
      return;
    }
    
    if (discountType === 'category') {
      // Check if this category already has a discount
      const existingDiscountIndex = categoryDiscounts.findIndex(
        d => d.categoryName === selectedCategory
      );
      
      if (existingDiscountIndex >= 0) {
        // Update existing discount
        setCategoryDiscounts(prev => 
          prev.map((discount, index) => 
            index === existingDiscountIndex 
              ? { 
                  ...discount, 
                  discountPercent: discountValue,
                  startDate: adminDiscountStartDate,
                  endDate: adminDiscountEndDate,
                } 
              : discount
          )
        );
      } else {
        // Add new discount
        setCategoryDiscounts(prev => [
          ...prev,
          {
            id: `cd${prev.length + 1}`,
            categoryName: selectedCategory,
            discountPercent: discountValue,
            startDate: adminDiscountStartDate,
            endDate: adminDiscountEndDate,
          }
        ]);
      }
      
      toast({
        title: "Category discount applied",
        description: `All ${selectedCategory} services now have a ${discountValue}% discount from ${
          adminDiscountStartDate ? format(adminDiscountStartDate, 'MMM dd, yyyy') : ''
        } to ${
          adminDiscountEndDate ? format(adminDiscountEndDate, 'MMM dd, yyyy') : ''
        }`,
      });
    } else if (discountType === 'city') {
      // Check if this city already has a discount
      const existingDiscountIndex = cityDiscounts.findIndex(
        d => d.cityName === selectedCity
      );
      
      if (existingDiscountIndex >= 0) {
        // Update existing discount
        setCityDiscounts(prev => 
          prev.map((discount, index) => 
            index === existingDiscountIndex 
              ? { 
                  ...discount, 
                  discountPercent: discountValue,
                  startDate: adminDiscountStartDate,
                  endDate: adminDiscountEndDate,
                } 
              : discount
          )
        );
      } else {
        // Add new discount
        setCityDiscounts(prev => [
          ...prev,
          {
            id: `cid${prev.length + 1}`,
            cityName: selectedCity,
            discountPercent: discountValue,
            startDate: adminDiscountStartDate,
            endDate: adminDiscountEndDate,
          }
        ]);
      }
      
      toast({
        title: "City discount applied",
        description: `All vendors in ${selectedCity} now have a ${discountValue}% discount from ${
          adminDiscountStartDate ? format(adminDiscountStartDate, 'MMM dd, yyyy') : ''
        } to ${
          adminDiscountEndDate ? format(adminDiscountEndDate, 'MMM dd, yyyy') : ''
        }`,
      });
    }
    
    setIsAdminDiscountDialogOpen(false);
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
  
  const getVendorDiscount = (vendorId: string) => {
    return vendorDiscounts.find(d => d.vendorId === vendorId);
  };

  const openAdminDiscountDialog = () => {
    setAdminDiscountPercent('15');
    setAdminDiscountStartDate(new Date());
    setAdminDiscountEndDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
    setDiscountType('category');
    setSelectedCategory(categories[0]);
    setSelectedCity(cities[0]);
    setIsAdminDiscountDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vendor Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={openAdminDiscountDialog}>
            <Percent className="w-4 h-4 mr-2" />
            Manage Discounts
          </Button>
          <Button>Add New Vendor</Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => {
                const vendorDiscount = getVendorDiscount(vendor.id);
                
                return (
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
                    <TableCell>{vendor.city}</TableCell>
                    <TableCell>₹{vendor.price.toLocaleString()}</TableCell>
                    <TableCell>
                      {vendorDiscount ? (
                        <div className="flex items-center">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 gap-1">
                            <Percent className="h-3 w-3" />
                            {vendorDiscount.discountPercent}% off
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="ml-1 h-6 w-6"
                            onClick={() => handleEditDiscount(vendor)}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-xs"
                          onClick={() => handleEditDiscount(vendor)}
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          Add Discount
                        </Button>
                      )}
                    </TableCell>
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
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Price Edit Dialog */}
      <Dialog open={isPriceDialogOpen} onOpenChange={setIsPriceDialogOpen}>
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
            <Button variant="outline" onClick={() => setIsPriceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveVendor}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Vendor Discount Dialog */}
      <Dialog open={isDiscountDialogOpen} onOpenChange={setIsDiscountDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Vendor Discount</DialogTitle>
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
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="discount-type" className="mb-2 block">Discount Type</Label>
                  <div className="flex items-center space-x-2 mb-4">
                    <Switch 
                      id="discount-type"
                      checked={isMonthlyDiscount}
                      onCheckedChange={setIsMonthlyDiscount}
                    />
                    <Label htmlFor="discount-type">
                      {isMonthlyDiscount ? 'Monthly Discount' : 'Single Day Discount'}
                    </Label>
                  </div>
                </div>
                
                {!isMonthlyDiscount && (
                  <div className="space-y-2">
                    <Label>Discount Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate || undefined}
                          onSelect={setSelectedDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="discount-percent">Discount Percentage (%)</Label>
                  <Input
                    id="discount-percent"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    placeholder="Enter discount percentage"
                  />
                </div>
                
                <div className="bg-amber-50 text-amber-800 p-3 rounded-md text-sm">
                  <p>
                    This will set a {discountPercent}% discount
                    {isMonthlyDiscount 
                      ? ' for the entire month' 
                      : selectedDate 
                        ? ` on ${format(selectedDate, 'MMMM dd, yyyy')}` 
                        : ''
                    }.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDiscountDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDiscount}>
              Apply Discount
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Admin Discount Dialog */}
      <Dialog open={isAdminDiscountDialogOpen} onOpenChange={setIsAdminDiscountDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Global Discounts</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="category" onValueChange={(value) => setDiscountType(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="category">By Category</TabsTrigger>
              <TabsTrigger value="city">By City</TabsTrigger>
            </TabsList>
            
            <TabsContent value="category" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="category-select">Select Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {adminDiscountStartDate ? (
                          format(adminDiscountStartDate, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={adminDiscountStartDate || undefined}
                        onSelect={setAdminDiscountStartDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {adminDiscountEndDate ? (
                          format(adminDiscountEndDate, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={adminDiscountEndDate || undefined}
                        onSelect={setAdminDiscountEndDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-discount-percent">Discount Percentage (%)</Label>
                <Input
                  id="admin-discount-percent"
                  value={adminDiscountPercent}
                  onChange={(e) => setAdminDiscountPercent(e.target.value)}
                  placeholder="Enter discount percentage"
                />
              </div>
              
              {/* Display existing category discounts */}
              {categoryDiscounts.length > 0 && (
                <div className="space-y-2 border-t pt-3 mt-3">
                  <Label>Existing Category Discounts</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {categoryDiscounts.map(discount => (
                      <div key={discount.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{discount.categoryName}</span>
                          <span className="text-sm text-gray-500 ml-2">{discount.discountPercent}% off</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {discount.startDate && discount.endDate
                            ? `${format(discount.startDate, 'MMM dd')} - ${format(discount.endDate, 'MMM dd')}`
                            : 'Ongoing'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="city" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="city-select">Select City</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {adminDiscountStartDate ? (
                          format(adminDiscountStartDate, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={adminDiscountStartDate || undefined}
                        onSelect={setAdminDiscountStartDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {adminDiscountEndDate ? (
                          format(adminDiscountEndDate, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={adminDiscountEndDate || undefined}
                        onSelect={setAdminDiscountEndDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-discount-percent-city">Discount Percentage (%)</Label>
                <Input
                  id="admin-discount-percent-city"
                  value={adminDiscountPercent}
                  onChange={(e) => setAdminDiscountPercent(e.target.value)}
                  placeholder="Enter discount percentage"
                />
              </div>
              
              {/* Display existing city discounts */}
              {cityDiscounts.length > 0 && (
                <div className="space-y-2 border-t pt-3 mt-3">
                  <Label>Existing City Discounts</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {cityDiscounts.map(discount => (
                      <div key={discount.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{discount.cityName}</span>
                          <span className="text-sm text-gray-500 ml-2">{discount.discountPercent}% off</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {discount.startDate && discount.endDate
                            ? `${format(discount.startDate, 'MMM dd')} - ${format(discount.endDate, 'MMM dd')}`
                            : 'Ongoing'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdminDiscountDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAdminDiscount}>
              Apply Discount
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminVendorManager;
