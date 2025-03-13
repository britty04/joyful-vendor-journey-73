
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "How do I book an event on Festivize?",
    answer: "To book an event, browse through our vendors, select your preferred services, add them to your cart, and proceed to checkout. You can also use our AI-guided booking process for personalized recommendations."
  },
  {
    question: "What happens if I need to cancel my booking?",
    answer: "Our cancellation policy varies depending on the vendor and service. Generally, cancellations made 30 days before the event receive a full refund, 15-29 days before receive a 50% refund, and less than 15 days may not be eligible for refunds. Please check the specific vendor's policies at checkout."
  },
  {
    question: "How can I become a vendor on Festivize?",
    answer: "To become a vendor, visit our 'Vendor Onboarding' page and fill out the application form. Our team will review your submission and get back to you within 2-3 business days."
  },
  {
    question: "Do you offer package deals for multiple services?",
    answer: "Yes, we offer package deals for multiple services. You can check our 'Special Offers' section or contact our customer support for customized packages tailored to your event needs."
  },
  {
    question: "How do I track my booking status?",
    answer: "You can track your booking status by logging into your account and visiting the 'Bookings' section in your profile dashboard. You'll receive email updates about your booking status as well."
  },
];

const FAQSection = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;
