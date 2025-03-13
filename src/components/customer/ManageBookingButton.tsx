
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

interface ManageBookingButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  tab?: 'bookings' | 'address' | 'payment-methods' | 'reviews';
}

const ManageBookingButton: React.FC<ManageBookingButtonProps> = ({ 
  variant = 'default',
  size = 'default',
  className = '',
  tab = 'bookings'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/customer/profile?tab=${tab}`);
  };

  const buttonText = () => {
    switch (tab) {
      case 'address':
        return 'Manage Addresses';
      case 'payment-methods':
        return 'Manage Payment Methods';
      case 'reviews':
        return 'Manage Reviews';
      case 'bookings':
      default:
        return 'Manage Bookings';
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleClick}
      className={className}
    >
      <CalendarDays className="w-4 h-4 mr-2" />
      {buttonText()}
    </Button>
  );
};

export default ManageBookingButton;
