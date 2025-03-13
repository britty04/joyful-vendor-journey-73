
import React from 'react';
import { LifeBuoy } from 'lucide-react';

const SupportHeader = () => {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
        <LifeBuoy className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">How Can We Help You?</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Our support team is here to assist you. Browse through our frequently asked questions or reach out to us directly.
      </p>
    </div>
  );
};

export default SupportHeader;
