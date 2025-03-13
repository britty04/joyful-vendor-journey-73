
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { IndianRupee, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Mock data for sales by city
const salesByCity = [
  { name: 'Mumbai', value: 420000 },
  { name: 'Delhi', value: 380000 },
  { name: 'Bangalore', value: 350000 },
  { name: 'Hyderabad', value: 300000 },
  { name: 'Chennai', value: 270000 },
  { name: 'Pune', value: 220000 },
  { name: 'Kolkata', value: 200000 },
];

// Mock data for bookings by city
const bookingsByCity = [
  { name: 'Mumbai', value: 142 },
  { name: 'Delhi', value: 128 },
  { name: 'Bangalore', value: 115 },
  { name: 'Hyderabad', value: 98 },
  { name: 'Chennai', value: 87 },
  { name: 'Pune', value: 76 },
  { name: 'Kolkata', value: 65 },
];

// Mock data for monthly sales
const monthlySales = [
  { month: 'Jan', sales: 150000, bookings: 45 },
  { month: 'Feb', sales: 180000, bookings: 53 },
  { month: 'Mar', sales: 220000, bookings: 62 },
  { month: 'Apr', sales: 270000, bookings: 78 },
  { month: 'May', sales: 320000, bookings: 92 },
  { month: 'Jun', sales: 380000, bookings: 108 },
  { month: 'Jul', sales: 420000, bookings: 125 },
  { month: 'Aug', sales: 450000, bookings: 132 },
  { month: 'Sep', sales: 430000, bookings: 127 },
  { month: 'Oct', sales: 410000, bookings: 121 },
  { month: 'Nov', sales: 390000, bookings: 114 },
  { month: 'Dec', sales: 450000, bookings: 138 },
];

// Mock data for service category distribution
const serviceCategories = [
  { name: 'Venues', value: 35 },
  { name: 'Catering', value: 25 },
  { name: 'Photography', value: 15 },
  { name: 'Decoration', value: 10 },
  { name: 'Entertainment', value: 8 },
  { name: 'Others', value: 7 },
];

const COLORS = ['#9966FF', '#FF6B6B', '#4CB4FF', '#FFD166', '#06D6A0', '#8A84E2'];

const AdminSalesAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('year');
  
  const totalSales = 3828000;
  const totalBookings = 1095;
  const averageSale = Math.round(totalSales / totalBookings);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sales & Bookings Analytics</h2>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">₹{totalSales.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8.2% from last month</p>
              </div>
              <div className="p-2 bg-green-50 text-green-600 rounded-full">
                <IndianRupee className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{totalBookings}</div>
                <p className="text-xs text-muted-foreground">+12.4% from last month</p>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Booking Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">₹{averageSale.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+5.3% from last month</p>
              </div>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-full">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cities">City Analysis</TabsTrigger>
          <TabsTrigger value="services">Service Categories</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Sales and bookings trend over the last 12 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer config={{ sales: {}, bookings: {} }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySales} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#9966FF" />
                    <YAxis yAxisId="right" orientation="right" stroke="#4CB4FF" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#9966FF" activeDot={{ r: 8 }} name="Sales (₹)" />
                    <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#4CB4FF" name="Bookings" />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Cities Tab Content */}
        <TabsContent value="cities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales by City</CardTitle>
                <CardDescription>Total revenue generated across cities</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer config={{ sales: {} }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesByCity} layout="vertical" margin={{ top: 20, right: 30, left: 70, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#9966FF" name="Sales (₹)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Bookings by City</CardTitle>
                <CardDescription>Number of bookings across cities</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer config={{ bookings: {} }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bookingsByCity} layout="vertical" margin={{ top: 20, right: 30, left: 70, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#4CB4FF" name="Bookings" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Service Categories Tab Content */}
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Category Distribution</CardTitle>
              <CardDescription>Percentage of bookings by service type</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <ChartContainer config={{ services: {} }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={140}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {serviceCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSalesAnalytics;
