
import React from 'react';
import Layout from '@/components/Layout';
import SupportHeader from '@/components/customer-support/SupportHeader';
import FAQSection from '@/components/customer-support/FAQSection';
import ContactForm from '@/components/customer-support/ContactForm';
import SupportOptions from '@/components/customer-support/SupportOptions';

const CustomerSupport = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <SupportHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2">
            <FAQSection />
            <ContactForm />
          </div>
          <div className="lg:col-span-1">
            <SupportOptions />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerSupport;
