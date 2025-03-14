
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

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
}

const VendorSelection = ({
  primaryServiceName,
  primaryServiceId,
  vendors,
  selectedVendorId,
  onSelectVendor,
  onBack,
  onContinue
}: VendorSelectionProps) => {
  const { addToCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
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
      // Add selected vendor service to cart
      addToCart({
        id: `${primaryServiceId}-${selectedVendorId}`,
        name: `${primaryServiceName} by ${selectedVendor.name}`,
        price: selectedVendor.price,
        image: selectedVendor.image,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Event date a week from now
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
          Select from our top-rated {primaryServiceName.toLowerCase()} professionals
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {vendors.map((vendor) => (
          <div 
            key={vendor.id}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedVendorId === vendor.id ? 'border-primary shadow-md' : 'border-gray-200 hover:border-primary/30'
            }`}
            onClick={() => onSelectVendor(vendor.id)}
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
            </div>
          </div>
        ))}
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
    </div>
  );
};

export default VendorSelection;
