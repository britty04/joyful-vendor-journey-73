
import React from 'react';
import Layout from '@/components/Layout';
import ScalabilityOverview from '@/components/scalability/ScalabilityOverview';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ScalabilityDemo: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col gap-10">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Built for Growth & Scalability
            </h1>
            <p className="text-xl text-muted-foreground">
              Our platform is designed to scale with your business needs, from startup to enterprise
            </p>
          </div>
          
          {/* Key Features */}
          <div className="my-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Key Scalability Features</h2>
            <ScalabilityOverview />
          </div>
          
          {/* Growth Timeline */}
          <Card className="my-10">
            <CardHeader>
              <CardTitle className="text-2xl">Platform Growth Timeline</CardTitle>
              <CardDescription>
                Our modular architecture supports your journey from MVP to enterprise solution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-[22px] top-0 h-full w-[2px] bg-gray-200"></div>
                
                {/* Timeline Items */}
                <div className="space-y-12 relative">
                  {/* Phase 1 */}
                  <div className="flex gap-6">
                    <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Launch Phase</h3>
                      <p className="mt-1 text-muted-foreground">
                        Core marketplace functionality with basic vendor and customer features
                      </p>
                      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Vendor onboarding</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Service listings</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Basic search</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Simple bookings</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Phase 2 */}
                  <div className="flex gap-6">
                    <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Growth Phase</h3>
                      <p className="mt-1 text-muted-foreground">
                        Enhanced features for monetization and user engagement
                      </p>
                      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Subscription tiers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Advanced search filters</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Review system</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Analytics dashboard</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Phase 3 */}
                  <div className="flex gap-6">
                    <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Scale Phase</h3>
                      <p className="mt-1 text-muted-foreground">
                        Enterprise capabilities for large-scale operations
                      </p>
                      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Multi-region support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>API for integrations</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>White-label options</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Custom workflows</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-purple-100/20 rounded-xl p-8 text-center my-10">
            <h2 className="text-2xl font-bold mb-4">Ready to Scale Your Event Marketplace?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our platform grows with your business, providing the tools and infrastructure you need at every stage
            </p>
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScalabilityDemo;
