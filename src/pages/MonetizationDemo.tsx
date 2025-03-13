
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SubscriptionPlans from '@/components/monetization/SubscriptionPlans';
import VendorRevenue from '@/components/monetization/VendorRevenue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const MonetizationDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState("subscriptions");
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Monetization Strategies</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Discover multiple revenue streams and analytical tools to grow your event marketplace
            </p>
          </div>
          
          <Tabs defaultValue="subscriptions" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="subscriptions">Subscription Plans</TabsTrigger>
              <TabsTrigger value="commission">Commission Structure</TabsTrigger>
              <TabsTrigger value="analytics">Vendor Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="subscriptions">
              <SubscriptionPlans />
            </TabsContent>
            
            <TabsContent value="commission">
              <div className="max-w-6xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Tiered Commission Structure</CardTitle>
                    <CardDescription>
                      Our platform uses a tiered commission structure based on vendor subscription level
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="bg-gray-50 rounded-t-lg">
                          <CardTitle>Free Plan</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="text-3xl font-bold mb-2">10%</p>
                          <p className="text-muted-foreground">Commission per transaction</p>
                          
                          <ul className="mt-6 space-y-2">
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span>Standard payout timeline (7 days)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span>Basic support</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-primary shadow-md">
                        <CardHeader className="bg-primary text-white rounded-t-lg">
                          <CardTitle>Pro Plan</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="text-3xl font-bold mb-2">7%</p>
                          <p className="text-muted-foreground">Commission per transaction</p>
                          
                          <ul className="mt-6 space-y-2">
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span>Faster payout timeline (3 days)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span>Priority support</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span>Reduced transaction fees</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="bg-gray-50 rounded-t-lg">
                          <CardTitle>Business Plan</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="text-3xl font-bold mb-2">5%</p>
                          <p className="text-muted-foreground">Commission per transaction</p>
                          
                          <ul className="mt-6 space-y-2">
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span>Express payout timeline (1 day)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span>Dedicated account manager</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span>Lowest transaction fees</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span>Custom integrations available</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mt-12 text-center">
                      <Button size="lg" className="gap-2">
                        Start Selling Today <ArrowRight className="h-4 w-4" />
                      </Button>
                      <p className="text-muted-foreground text-sm mt-2">
                        No setup fees. Start earning from your very first booking.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <VendorRevenue />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default MonetizationDemo;
