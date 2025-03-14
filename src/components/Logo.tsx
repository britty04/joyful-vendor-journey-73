
import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon, Calendar, Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showIcon = true,
  showText = true,
  className = ''
}) => {
  // Size mapping for text and icons
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const iconSizeMap = {
    sm: 16,
    md: 22,
    lg: 28
  };

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      {showIcon && (
        <div className="relative mr-1">
          <Hexagon
            size={iconSizeMap[size]}
            className="text-eventPurple-500" 
            strokeWidth={1.5}
            fill="rgba(155, 135, 245, 0.1)"
          />
          <Calendar
            size={iconSizeMap[size] * 0.6}
            className="text-eventPurple-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            strokeWidth={1.5}
          />
          <Sparkles 
            size={iconSizeMap[size] * 0.5}
            className="text-eventBlue-500 absolute -top-1 -right-1"
            strokeWidth={1.5}
          />
        </div>
      )}
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-eventBlue-600 to-eventPurple-600 bg-clip-text text-transparent`}>
          EventHive
        </span>
      )}
    </Link>
  );
};

export default Logo;
