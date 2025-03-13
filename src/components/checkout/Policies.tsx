
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Info } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface PoliciesProps {
  onAgreementChange: (agreed: boolean) => void;
  isAgreed: boolean;
}

const Policies: React.FC<PoliciesProps> = ({ onAgreementChange, isAgreed }) => {
  return (
    <div className="space-y-6">
      <h3 className="font-medium">Terms and Policies</h3>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="cancellation">
          <AccordionTrigger className="text-left">Cancellation Policy</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Full refund for cancellations made 14 days or more before the event date.</li>
              <li>50% refund for cancellations made between 7-14 days before the event.</li>
              <li>No refund for cancellations within 7 days of the event.</li>
              <li>Force majeure events will be considered on a case-by-case basis.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="rescheduling">
          <AccordionTrigger className="text-left">Rescheduling Policy</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Rescheduling is free up to 7 days before the event.</li>
              <li>A fee of 10% applies for changes made within 7 days of the event.</li>
              <li>No rescheduling is allowed within 48 hours of the event.</li>
              <li>All rescheduling is subject to vendor availability.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="payment">
          <AccordionTrigger className="text-left">Payment Terms</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>A 50% advance payment is required to confirm the booking.</li>
              <li>The remaining balance must be paid 7 days before the event date.</li>
              <li>For bookings made within 7 days of the event, full payment is required.</li>
              <li>All payments are secured using industry-standard encryption.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="privacy">
          <AccordionTrigger className="text-left">Privacy Policy</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600 mb-2">
              We collect personal information to process your order and provide the services you've requested. 
              Your information is stored securely and will not be shared with third parties except as necessary 
              to fulfill your order.
            </p>
            <p className="text-gray-600">
              By proceeding with this booking, you consent to the collection and use of your information as described 
              in our full Privacy Policy.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800">Important Note</h4>
            <p className="text-amber-700 text-sm mt-1">
              By proceeding with this booking, you acknowledge that you have read and agree to the cancellation, 
              rescheduling, and payment policies outlined above.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-start space-x-3 pt-2">
        <Checkbox 
          id="terms" 
          checked={isAgreed}
          onCheckedChange={(checked) => onAgreementChange(checked === true)}
          className="mt-1"
        />
        <div>
          <Label 
            htmlFor="terms"
            className="font-medium cursor-pointer"
          >
            I agree to the Terms and Policies
          </Label>
          <p className="text-gray-500 text-sm mt-1">
            By checking this box, you confirm that you have read and agree to our Terms of Service, 
            Privacy Policy, and the policies outlined above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policies;
