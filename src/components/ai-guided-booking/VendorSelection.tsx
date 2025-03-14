import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Briefcase, ShoppingBag, Star, MapPin, Calendar, Clock, ExternalLink, Info } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import VendorAvailabilityBadge from "@/components/VendorAvailabilityBadge";

interface Vendor {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  responseTime: string;
}

interface VendorSelectionProps {
  primaryServiceName: string;
  primaryServiceId: string | null;
  vendors: Vendor[];
  selectedVendorId: string | null;
  onSelectVendor: (vendorId: string) => void;
  onBack: () => void;
  onContinue: () => void;
  selectedCity?: string;
  selectedDate?: Date;
  selectedTime?: string;
}

const VendorSelection = ({
  primaryServiceName,
  primaryServiceId,
  vendors,
  selectedVendorId,
  onSelectVendor,
  onBack,
  onContinue,
  selectedCity = "Local Area",
  selectedDate = new Date(),
  selectedTime = "12:00 PM"
}: VendorSelectionProps) => {
  const { addToCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [vendorDetailOpen, setVendorDetailOpen] = useState(false);
  const [selectedVendorDetail, setSelectedVendorDetail] = useState<Vendor | null>(null);
  
  const handleContinue = () => {
    if (!selectedVendorId) {
      toast({
        title: "No vendor selected",
        description: "Please select a vendor to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Find the selected vendor
    const selectedVendor = vendors.find(v => v.id === selectedVendorId);
    
    if (selectedVendor) {
      // Add selected vendor service to cart with date and time
      addToCart({
        id: `${primaryServiceId}-${selectedVendorId}`,
        name: `${primaryServiceName} by ${selectedVendor.name}`,
        price: selectedVendor.price,
        image: selectedVendor.image,
        date: selectedDate, // Use the selected date
        time: selectedTime,  // Add time
        location: selectedCity // Add location
      });
      
      toast({
        title: "Vendor selected",
        description: `${selectedVendor.name} has been added to your cart for ${primaryServiceName}.`,
      });
    }
    
    // Continue to recommendations
    setTimeout(() => {
      setIsProcessing(false);
      onContinue();
    }, 500);
  };

  const handleShowVendorDetails = (vendor: Vendor) => {
    setSelectedVendorDetail(vendor);
    setVendorDetailOpen(true);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center justify-center mb-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          Choose a {primaryServiceName} Vendor
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Select from our top-rated {primaryServiceName.toLowerCase()} professionals in {selectedCity}
        </p>
        
        {/* Event details summary */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
            {selectedCity}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
            {format(selectedDate, 'MMM dd, yyyy')}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-400" />
            {selectedTime}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {vendors.length === 0 ? (
          <div className="col-span-2 text-center p-8 border border-dashed rounded-lg">
            <Info className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No vendors available</h3>
            <p className="text-gray-500">
              There are no {primaryServiceName.toLowerCase()} vendors available in {selectedCity} on {format(selectedDate, 'MMMM dd, yyyy')} at {selectedTime}.
            </p>
            <Button variant="outline" className="mt-4" onClick={onBack}>
              Change date or location
            </Button>
          </div>
        ) : (
          vendors.map((vendor) => (
            <div 
              key={vendor.id}
              className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedVendorId === vendor.id ? 'border-primary shadow-md' : 'border-gray-200 hover:border-primary/30'
              }`}
            >
              <div className="relative h-48">
                <img 
                  src={vendor.image} 
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
                {selectedVendorId === vendor.id && (
                  <div className="absolute top-3 right-3 bg-primary text-white p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                <div className="absolute top-3 left-3">
                  <VendorAvailabilityBadge 
                    availability="available" 
                    className="text-xs"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{vendor.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                    <span>{vendor.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{vendor.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">₹{vendor.price.toLocaleString()}</span>
                  <div className="text-sm text-gray-500">
                    Response time: {vendor.responseTime}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowVendorDetails(vendor);
                    }}
                  >
                    <Info className="h-4 w-4 mr-1" />
                    Show more
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => onSelectVendor(vendor.id)}
                  >
                    Select
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        
        <Button onClick={handleContinue} disabled={isProcessing || !selectedVendorId}>
          {isProcessing ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              Continue
              <ShoppingBag className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {/* Vendor Detail Dialog */}
      <Dialog open={vendorDetailOpen} onOpenChange={setVendorDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedVendorDetail?.name}</DialogTitle>
            <DialogDescription>
              Detailed information about this vendor
            </DialogDescription>
          </DialogHeader>
          
          {selectedVendorDetail && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="rounded-lg overflow-hidden mb-4">
                  <img 
                    src={selectedVendorDetail.image} 
                    alt={selectedVendorDetail.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-sm">
                    <Star className="w-4 h-4 mr-1 fill-amber-500 text-amber-500" />
                    {selectedVendorDetail.rating.toFixed(1)} Rating
                  </div>
                  <div className="text-gray-500 text-sm">
                    ~50 reviews
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 mb-1">About</h3>
                  <p className="text-gray-600">
                    {selectedVendorDetail.description}
                    <br /><br />
                    We specialize in creating memorable {primaryServiceName.toLowerCase()} services for all types of events. 
                    Our team has over 5 years of experience and we pride ourselves on our professionalism and attention to detail.
                  </p>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">Booking Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Service</span>
                      <span className="font-medium">{primaryServiceName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium">{selectedCity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">{format(selectedDate, 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Time</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2 mt-2">
                      <span className="text-gray-800 font-medium">Price</span>
                      <span className="text-primary font-bold">₹{selectedVendorDetail.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">Services Include</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Professional {primaryServiceName.toLowerCase()} service</li>
                    <li>Setup and preparation</li>
                    <li>All necessary equipment</li>
                    <li>Expert assistance throughout the event</li>
                    <li>Post-event cleanup</li>
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">Contact Information</h3>
                  <div className="text-gray-600">
                    <p>Phone: +91 98765 43210</p>
                    <p>Email: contact@{selectedVendorDetail.name.toLowerCase().replace(/\s+/g, '')}.com</p>
                  </div>
                </div>
                
                <div className="mt-4 space-x-3">
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      onSelectVendor(selectedVendorDetail.id);
                      setVendorDetailOpen(false);
                    }}
                  >
                    Select This Vendor
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    asChild
                  >
                    <a href={`/vendor/${selectedVendorDetail.id}`} target="_blank" rel="noopener noreferrer">
                      View Full Profile
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorSelection;
