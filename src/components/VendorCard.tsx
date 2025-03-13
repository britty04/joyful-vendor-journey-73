
import { Heart, Star, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface VendorCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  price: string;
  badges?: string[];
}

const VendorCard = ({
  id,
  name,
  category,
  rating,
  reviewCount,
  location,
  image,
  price,
  badges = []
}: VendorCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="group glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Vendor Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className={`absolute inset-0 bg-gray-200 ${isImageLoaded ? 'hidden' : 'flex'} items-center justify-center`}>
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
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isFavorited 
              ? 'bg-white text-red-500' 
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
                className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full text-gray-800 shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Vendor Info */}
      <Link to={`/vendor/${id}`} className="block p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">{category}</span>
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span>
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
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View Details
          </button>
        </div>
      </Link>
    </div>
  );
};

export default VendorCard;
