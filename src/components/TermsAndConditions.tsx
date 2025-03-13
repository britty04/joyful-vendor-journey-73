
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const TermsAndConditions = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="text-gray-400 hover:text-gray-300 transition-colors text-sm">
          Terms & Conditions
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read these terms and conditions carefully before using our services.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="mt-4 h-[450px] pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-2">1. Introduction</h3>
              <p className="text-gray-600">
                Welcome to EventHorizon's Terms and Conditions. These terms govern your use of our platform,
                website, and services. By accessing or using our services, you agree to be bound by these Terms.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-semibold mb-2">2. Definitions</h3>
              <p className="text-gray-600 mb-3">
                For the purpose of these Terms and Conditions:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>"Platform" refers to the EventHorizon website and mobile applications.</li>
                <li>"Services" refers to all services offered through our Platform.</li>
                <li>"User" refers to individuals who register and use our Services.</li>
                <li>"Vendor" refers to service providers who list their services on our Platform.</li>
                <li>"Client" refers to users who book services through our Platform.</li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-semibold mb-2">3. Account Registration</h3>
              <p className="text-gray-600 mb-3">
                To use certain features of our Service, you must register for an account. You agree to provide accurate,
                current, and complete information during the registration process and to update such information to keep it
                accurate, current, and complete.
              </p>
              <p className="text-gray-600">
                You are responsible for safeguarding your password. You agree not to disclose your password to any third party
                and to take sole responsibility for any activities or actions under your account, whether or not you have
                authorized such activities or actions.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-semibold mb-2">4. Platform Usage</h3>
              <p className="text-gray-600 mb-3">
                Our platform allows users to discover, compare, and book event-related services. Users must comply with
                the following rules:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Do not use the platform for any illegal purposes.</li>
                <li>Do not attempt to gain unauthorized access to any portion of the platform.</li>
                <li>Do not interfere with or disrupt the integrity or performance of the platform.</li>
                <li>Do not collect or harvest any information from the platform unless explicitly authorized.</li>
                <li>Do not engage in any activity that could harm, disable, or impair the platform.</li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-semibold mb-2">5. Payments and Fees</h3>
              <p className="text-gray-600 mb-3">
                By booking services through our platform, you agree to pay all fees applicable to your booking. 
                Payment processing services for users on EventHorizon are provided by approved payment processors.
              </p>
              <p className="text-gray-600">
                Vendors may set their own cancellation policies, which will be clearly displayed before booking. 
                Refunds are processed according to these policies. EventHorizon charges a service fee for facilitating 
                bookings, which is included in the total price displayed.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-semibold mb-2">6. Vendor Responsibilities</h3>
              <p className="text-gray-600">
                Vendors are responsible for providing accurate and complete information about their services,
                including pricing, availability, and descriptions. Vendors are independent contractors and not employees
                or agents of EventHorizon. EventHorizon is not responsible for the quality, safety, or legality
                of services provided by Vendors.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-semibold mb-2">7. Limitation of Liability</h3>
              <p className="text-gray-600">
                To the maximum extent permitted by law, EventHorizon shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of
                or in connection with these Terms or the use of or inability to use the Services.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-semibold mb-2">8. Indemnification</h3>
              <p className="text-gray-600">
                You agree to indemnify, defend, and hold harmless EventHorizon and its affiliates, officers, directors,
                employees, and agents from and against any claims, liabilities, damages, losses, costs, expenses, or fees
                (including reasonable attorneys' fees) that such parties may incur as a result of or arising from your
                violation of these Terms.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-semibold mb-2">9. Changes to Terms</h3>
              <p className="text-gray-600">
                EventHorizon reserves the right to modify these Terms at any time. We will provide notice of significant
                changes by posting the updated Terms on the Platform and updating the "Last Updated" date. Your continued
                use of the Service after such modifications constitutes your acceptance of the modified Terms.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h3 className="text-lg font-semibold mb-2">10. Governing Law</h3>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to
                its conflict of law provisions. You and EventHorizon agree to submit to the personal and exclusive
                jurisdiction of the courts located in Mumbai, India.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <p className="text-gray-600 mt-4 italic">
                Last Updated: June 10, 2023
              </p>
            </section>
          </div>
        </ScrollArea>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditions;
