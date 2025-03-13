
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
}

interface PriceRange {
  min: number;
  max: number;
}

interface SearchFiltersProps {
  onFilterChange: (filters: {
    categories: string[];
    priceRange: PriceRange;
    rating: number | null;
    location: string | null;
    availability: boolean;
  }) => void;
  className?: string;
  initialFilters?: {
    categories: string[];
    priceRange: PriceRange;
    rating: number | null;
    location: string | null;
    availability: boolean;
  };
}

const categoryOptions: FilterOption[] = [
  { id: 'entertainers', label: 'Entertainers' },
  { id: 'decorators', label: 'Decorators' },
  { id: 'catering', label: 'Catering' },
  { id: 'photographers', label: 'Photographers' },
  { id: 'venues', label: 'Venues' },
  { id: 'makeup', label: 'Makeup Artists' },
  { id: 'mehendi', label: 'Mehendi Artists' },
];

const locationOptions: FilterOption[] = [
  { id: 'mumbai', label: 'Mumbai' },
  { id: 'delhi', label: 'Delhi NCR' },
  { id: 'bangalore', label: 'Bangalore' },
  { id: 'chennai', label: 'Chennai' },
  { id: 'hyderabad', label: 'Hyderabad' },
  { id: 'pune', label: 'Pune' },
];

const ratingOptions: FilterOption[] = [
  { id: '4', label: '4★ & above' },
  { id: '3', label: '3★ & above' },
  { id: '2', label: '2★ & above' },
];

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  onFilterChange, 
  className = '',
  initialFilters = {
    categories: [],
    priceRange: { min: 1000, max: 50000 },
    rating: null,
    location: null,
    availability: false
  }
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters.categories);
  const [priceRange, setPriceRange] = useState<PriceRange>(initialFilters.priceRange);
  const [selectedRating, setSelectedRating] = useState<string | null>(initialFilters.rating?.toString() || null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(initialFilters.location);
  const [showAvailableOnly, setShowAvailableOnly] = useState<boolean>(initialFilters.availability);
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(
    initialFilters.categories.length + 
    (initialFilters.rating ? 1 : 0) + 
    (initialFilters.location ? 1 : 0) + 
    (initialFilters.availability ? 1 : 0)
  );

  const handleCategoryChange = (category: string, checked: boolean) => {
    let updatedCategories;
    
    if (checked) {
      updatedCategories = [...selectedCategories, category];
    } else {
      updatedCategories = selectedCategories.filter(c => c !== category);
    }
    
    setSelectedCategories(updatedCategories);
    updateFilters({ categories: updatedCategories });
  };

  const handlePriceChange = (value: number[]) => {
    const newRange = { min: value[0], max: value[1] };
    setPriceRange(newRange);
    updateFilters({ priceRange: newRange });
  };

  const handleRatingChange = (value: string) => {
    setSelectedRating(value);
    updateFilters({ rating: parseInt(value) });
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    updateFilters({ location: value });
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setShowAvailableOnly(checked);
    updateFilters({ availability: checked });
  };

  const updateFilters = (changedFilters: Partial<{
    categories: string[];
    priceRange: PriceRange;
    rating: number | null;
    location: string | null;
    availability: boolean;
  }>) => {
    const newFilters = {
      categories: changedFilters.categories !== undefined ? changedFilters.categories : selectedCategories,
      priceRange: changedFilters.priceRange !== undefined ? changedFilters.priceRange : priceRange,
      rating: changedFilters.rating !== undefined ? changedFilters.rating : selectedRating ? parseInt(selectedRating) : null,
      location: changedFilters.location !== undefined ? changedFilters.location : selectedLocation,
      availability: changedFilters.availability !== undefined ? changedFilters.availability : showAvailableOnly,
    };
    
    // Calculate active filters count
    let count = 0;
    count += newFilters.categories.length;
    count += newFilters.rating !== null ? 1 : 0;
    count += newFilters.location !== null ? 1 : 0;
    count += newFilters.availability ? 1 : 0;
    
    setActiveFiltersCount(count);
    
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 1000, max: 50000 });
    setSelectedRating(null);
    setSelectedLocation(null);
    setShowAvailableOnly(false);
    setActiveFiltersCount(0);
    
    onFilterChange({
      categories: [],
      priceRange: { min: 1000, max: 50000 },
      rating: null,
      location: null,
      availability: false
    });
  };

  // Function to format price as Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const removeCategory = (category: string) => {
    const updatedCategories = selectedCategories.filter(c => c !== category);
    setSelectedCategories(updatedCategories);
    updateFilters({ categories: updatedCategories });
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Reset All
          </Button>
        )}
      </div>
      
      {/* Active filters display */}
      {activeFiltersCount > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {selectedCategories.map(category => {
            const categoryLabel = categoryOptions.find(c => c.id === category)?.label || category;
            return (
              <Badge variant="outline" key={category} className="flex items-center gap-1">
                {categoryLabel}
                <button onClick={() => removeCategory(category)} className="ml-1 hover:text-foreground">
                  <X size={12} />
                </button>
              </Badge>
            );
          })}
          
          {selectedLocation && (
            <Badge variant="outline" className="flex items-center gap-1">
              {locationOptions.find(l => l.id === selectedLocation)?.label || selectedLocation}
              <button onClick={() => { setSelectedLocation(null); updateFilters({ location: null }); }} className="ml-1 hover:text-foreground">
                <X size={12} />
              </button>
            </Badge>
          )}
          
          {selectedRating && (
            <Badge variant="outline" className="flex items-center gap-1">
              {ratingOptions.find(r => r.id === selectedRating)?.label || `${selectedRating}★ & above`}
              <button onClick={() => { setSelectedRating(null); updateFilters({ rating: null }); }} className="ml-1 hover:text-foreground">
                <X size={12} />
              </button>
            </Badge>
          )}
          
          {showAvailableOnly && (
            <Badge variant="outline" className="flex items-center gap-1">
              Available Now
              <button onClick={() => { setShowAvailableOnly(false); updateFilters({ availability: false }); }} className="ml-1 hover:text-foreground">
                <X size={12} />
              </button>
            </Badge>
          )}
        </div>
      )}
      
      <Accordion type="multiple" defaultValue={["category", "price", "rating", "location"]}>
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categoryOptions.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`} 
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`category-${category.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 px-1">
              <Slider 
                defaultValue={[priceRange.min, priceRange.max]}
                min={1000}
                max={50000}
                step={1000}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatPrice(priceRange.min)}</span>
                <span>{formatPrice(priceRange.max)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={selectedRating || ""} onValueChange={handleRatingChange}>
              {ratingOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={`rating-${option.id}`} />
                  <Label 
                    htmlFor={`rating-${option.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="location">
          <AccordionTrigger>Location</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={selectedLocation || ""} onValueChange={handleLocationChange}>
              {locationOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={`location-${option.id}`} />
                  <Label 
                    htmlFor={`location-${option.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="availability" 
            checked={showAvailableOnly}
            onCheckedChange={(checked) => handleAvailabilityChange(checked as boolean)}
          />
          <Label 
            htmlFor="availability"
            className="text-sm cursor-pointer"
          >
            Show only available vendors
          </Label>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
