
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-eventBlue-600 to-eventPurple-600 bg-clip-text text-transparent">
              EventHive
            </h3>
            <p className="text-gray-600 max-w-xs">
              Your all-in-one marketplace for discovering and booking the perfect vendors for your next event.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="text-gray-600 hover:text-primary transition-colors">
                  Find Vendors
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">For Vendors</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/vendor-signup" className="text-gray-600 hover:text-primary transition-colors">
                  Join as Vendor
                </Link>
              </li>
              <li>
                <Link to="/vendor-login" className="text-gray-600 hover:text-primary transition-colors">
                  Vendor Login
                </Link>
              </li>
              <li>
                <Link to="/vendor-resources" className="text-gray-600 hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-600 hover:text-primary transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-500" />
                <a href="mailto:hello@eventhive.com" className="text-gray-600 hover:text-primary transition-colors">
                  hello@eventhive.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-500" />
                <a href="tel:+91123456789" className="text-gray-600 hover:text-primary transition-colors">
                  +91 12345 67890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} EventHive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
