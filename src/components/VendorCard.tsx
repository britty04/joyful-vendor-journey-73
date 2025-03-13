
import { Heart, Star, MapPin, Award } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface VendorCardProps {
  vendor: {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    rating: number;
    price: number;
  };
  id?: string;
  name?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
  image?: string;
  price?: string;
  badges?: string[];
}

const VendorCard = (props: VendorCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Check if we're using the vendor prop or individual props
  const isUsingVendorProp = !!props.vendor;
  
  // Set the values based on what's available
  const id = isUsingVendorProp ? props.vendor.id : props.id || '';
  const name = isUsingVendorProp ? props.vendor.name : props.name || '';
  const category = isUsingVendorProp ? props.vendor.category : props.category || '';
  const rating = isUsingVendorProp ? props.vendor.rating : props.rating || 0;
  const reviewCount = props.reviewCount || 0;
  const location = props.location || 'Local Area';
  const image = isUsingVendorProp ? props.vendor.image : props.image || '';
  const price = isUsingVendorProp ? `$${props.vendor.price}` : props.price || '';
  const badges = props.badges || [];

  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      'Featured': 'bg-gradient-to-r from-eventPurple-500 to-eventPink-500 text-white',
      'Top Rated': 'bg-gradient-to-r from-eventYellow-500 to-eventYellow-600 text-white',
      'Popular': 'bg-gradient-to-r from-eventPink-500 to-eventPink-600 text-white',
      'Kids Favorite': 'bg-gradient-to-r from-eventBlue-500 to-eventBlue-600 text-white',
      'Verified': 'bg-gradient-to-r from-eventGreen-500 to-eventGreen-600 text-white',
      'Best Value': 'bg-gradient-to-r from-eventBlue-500 to-eventPurple-500 text-white',
    };
    
    return colors[badge] || 'bg-white/90 text-gray-800';
  };

  return (
    <div className="group playful-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:playful-shadow">
      {/* Vendor Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className={`absolute inset-0 bg-purple-100 ${isImageLoaded ? 'hidden' : 'flex'} items-center justify-center`}>
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isImageLoaded ? 'block' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Favorite Button */}
        <button
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            isFavorited 
              ? 'bg-white text-red-500 shadow-md' 
              : 'bg-black/30 text-white hover:bg-white hover:text-gray-900'
          }`}
          onClick={(e) => {
            e.preventDefault();
            setIsFavorited(!isFavorited);
          }}
        >
          <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
        
        {/* Badges */}
        {badges && badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {badges.map((badge, index) => (
              <span 
                key={index}
                className={`px-3 py-1 backdrop-blur-sm text-xs font-medium rounded-full shadow-sm flex items-center ${getBadgeColor(badge)}`}
              >
                {badge === 'Top Rated' || badge === 'Verified' ? (
                  <Award size={12} className="mr-1" />
                ) : null}
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Vendor Info */}
      <Link to={`/vendor/${id}`} className="block p-5">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">{category}</span>
          <div className="flex items-center">
            <Star size={14} className="text-eventYellow-500 fill-eventYellow-500" />
            <span className="ml-1 text-sm font-semibold text-gray-700">{rating}</span>
            <span className="ml-1 text-xs text-gray-500">({reviewCount})</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{name}</h3>
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="font-bold text-gray-900">{price}</span>
            <span className="text-sm text-gray-600 ml-1">starting price</span>
          </div>
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center">
            View Details
            <svg className="ml-1 w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default VendorCard;
