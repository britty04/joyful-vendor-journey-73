
import { Facebook, Instagram, Twitter } from 'lucide-react';
import TermsAndConditions from './TermsAndConditions';

const FooterWithTerms = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">EventHorizon</h3>
            <p className="text-gray-400 mb-4">Making your special events truly memorable with the best services and vendors.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/vendors" className="text-gray-400 hover:text-white transition-colors">Browse Vendors</a></li>
              <li><a href="/guided-booking" className="text-gray-400 hover:text-white transition-colors">AI Guided Booking</a></li>
              <li><a href="/events" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Vendor Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Event Street</p>
              <p>Mumbai, MH 400001</p>
              <p>India</p>
              <p className="mt-2">Email: info@eventhorizon.com</p>
              <p>Phone: +91 98765 43210</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EventHorizon. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <TermsAndConditions />
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Cookies</a>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterWithTerms;
