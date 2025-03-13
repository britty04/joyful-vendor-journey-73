
import React from 'react';
import Layout from '@/components/Layout';
import CheckoutFlow from '@/components/checkout/CheckoutFlow';

const Checkout = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <CheckoutFlow />
      </div>
    </Layout>
  );
};

export default Checkout;
