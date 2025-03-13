
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import CartIcon from './cart/CartIcon';
import UserAuthNav from './UserAuthNav';

const NavbarCart = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link to="/services" className="text-gray-700 hover:text-primary transition-colors">
        Services
      </Link>
      <Link to="/events" className="text-gray-700 hover:text-primary transition-colors">
        Events
      </Link>
      <Link to="/guided-booking" className="text-gray-700 hover:text-primary transition-colors">
        AI Booking
      </Link>
      <Link to="/vendors" className="text-gray-700 hover:text-primary transition-colors">
        Vendors
      </Link>
      <div className="border-l h-6 mx-1 border-gray-300"></div>
      <CartIcon />
      <UserAuthNav />
    </div>
  );
};

export default NavbarCart;
