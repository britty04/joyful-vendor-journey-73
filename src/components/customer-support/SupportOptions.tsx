
import React from 'react';
import { Phone, Mail, MessageCircle, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import LiveChatDialog from './LiveChatDialog';

const SupportOptions = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Contact Methods</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Customer Support</p>
              <a href="tel:+917877665544" className="text-gray-600 hover:text-primary">
                +91 78776 65544
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Email Us</p>
              <a href="mailto:support@festivize.com" className="text-gray-600 hover:text-primary">
                support@festivize.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Working Hours</p>
              <p className="text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Head Office</p>
              <p className="text-gray-600">
                123 Festivize Tower, IT Park, <br />
                Mumbai, Maharashtra 400001
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Need Immediate Help?</h3>
        <div className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" variant="outline">
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Live Chat
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Live Chat Support</DialogTitle>
                <DialogDescription>
                  Connect with our support team instantly
                </DialogDescription>
              </DialogHeader>
              <LiveChatDialog />
            </DialogContent>
          </Dialog>
          
          <Button className="w-full" variant="secondary">
            <Phone className="mr-2 h-4 w-4" />
            Request Callback
          </Button>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-primary/10 to-purple-100 p-6 rounded-lg text-center">
        <h3 className="text-lg font-medium mb-2">Support Status</h3>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-3">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
          Online Now
        </div>
        <p className="text-gray-700 text-sm">
          Average response time: <span className="font-medium">5 minutes</span>
        </p>
      </div>
    </div>
  );
};

export default SupportOptions;
