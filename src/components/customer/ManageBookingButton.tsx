
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

interface ManageBookingButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const ManageBookingButton: React.FC<ManageBookingButtonProps> = ({ 
  variant = 'default',
  size = 'default',
  className = ''
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/customer/profile?tab=bookings');
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleClick}
      className={className}
    >
      <CalendarDays className="w-4 h-4 mr-2" />
      Manage Bookings
    </Button>
  );
};

export default ManageBookingButton;
