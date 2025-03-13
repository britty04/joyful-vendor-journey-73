
import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Calendar, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

const revenueData = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 1900 },
  { name: 'Mar', total: 1500 },
  { name: 'Apr', total: 2400 },
  { name: 'May', total: 2700 },
  { name: 'Jun', total: 3100 },
  { name: 'Jul', total: 3400 },
];

const bookingsData = [
  { name: 'Jan', total: 12 },
  { name: 'Feb', total: 19 },
  { name: 'Mar', total: 15 },
  { name: 'Apr', total: 24 },
  { name: 'May', total: 27 },
  { name: 'Jun', total: 31 },
  { name: 'Jul', total: 34 },
];

const VendorRevenue: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$16,543.82</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">162</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.3%</div>
            <div className="flex items-center text-xs text-red-500 mt-1">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              <span>-2.1% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+18.7% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Track your monthly revenue performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#6200ee"
                      fill="#6200ee"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Bookings Overview</CardTitle>
              <CardDescription>Track your monthly booking performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={bookingsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#6200ee" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorRevenue;
