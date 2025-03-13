
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { CalendarIcon, DownloadIcon, FilterIcon, TrendingUpIcon, ActivityIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Mock earnings data
const MONTHLY_DATA = [
  { month: 'Jan', earnings: 1200 },
  { month: 'Feb', earnings: 1800 },
  { month: 'Mar', earnings: 2400 },
  { month: 'Apr', earnings: 2000 },
  { month: 'May', earnings: 2800 },
  { month: 'Jun', earnings: 3500 },
  { month: 'Jul', earnings: 4200 },
  { month: 'Aug', earnings: 3800 },
  { month: 'Sep', earnings: 4500 },
  { month: 'Oct', earnings: 5000 },
  { month: 'Nov', earnings: 4700 },
  { month: 'Dec', earnings: 5500 },
];

const RECENT_TRANSACTIONS = [
  { id: '1', customerName: 'Emily Brown', date: '2023-11-05', service: 'Wedding Photography', amount: 2500, status: 'paid' },
  { id: '2', customerName: 'Michael Johnson', date: '2023-11-02', service: 'Corporate Catering', amount: 1200, status: 'paid' },
  { id: '3', customerName: 'Jane Smith', date: '2023-10-28', service: 'Birthday Party DJ', amount: 350, status: 'paid' },
  { id: '4', customerName: 'Robert Davis', date: '2023-10-25', service: 'Kids Entertainment', amount: 300, status: 'paid' },
];

const EVENT_TYPE_DATA = [
  { name: 'Kids Events', value: 35, color: '#3b82f6' },
  { name: 'Corporate', value: 25, color: '#10b981' },
  { name: 'Weddings', value: 40, color: '#f59e0b' },
];

const BOOKING_TREND_DATA = [
  { month: 'Jan', completed: 5, canceled: 1 },
  { month: 'Feb', completed: 7, canceled: 2 },
  { month: 'Mar', completed: 10, canceled: 1 },
  { month: 'Apr', completed: 8, canceled: 2 },
  { month: 'May', completed: 12, canceled: 3 },
  { month: 'Jun', completed: 15, canceled: 2 },
];

const CHART_CONFIG = {
  earnings: {
    label: "Earnings",
    theme: { light: "#7c3aed", dark: "#a78bfa" },
  },
  completed: {
    label: "Completed",
    theme: { light: "#10b981", dark: "#34d399" },
  },
  canceled: {
    label: "Canceled",
    theme: { light: "#ef4444", dark: "#f87171" },
  }
};

const CHART_CONFIG_PIE = {
  kids: {
    label: "Kids Events",
    theme: { light: "#3b82f6", dark: "#60a5fa" },
  },
  corporate: {
    label: "Corporate",
    theme: { light: "#10b981", dark: "#34d399" },
  },
  weddings: {
    label: "Weddings",
    theme: { light: "#f59e0b", dark: "#fbbf24" },
  },
};

const EarningsOverview = () => {
  const totalEarnings = MONTHLY_DATA.reduce((sum, month) => sum + month.earnings, 0);
  const thisMonthEarnings = MONTHLY_DATA[new Date().getMonth()].earnings;
  const previousMonthEarnings = MONTHLY_DATA[new Date().getMonth() - 1 < 0 ? 11 : new Date().getMonth() - 1].earnings;
  const percentageChange = ((thisMonthEarnings - previousMonthEarnings) / previousMonthEarnings) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold">Earnings Overview</h2>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>This Year</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FilterIcon className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <DownloadIcon className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Earnings Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
            <CardDescription>Lifetime earnings</CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${thisMonthEarnings.toLocaleString()}</div>
            <CardDescription className="flex items-center">
              <span className={percentageChange >= 0 ? "text-green-500" : "text-red-500"}>
                {percentageChange >= 0 ? "+" : ""}{percentageChange.toFixed(1)}%
              </span>
              <span className="ml-1">vs last month</span>
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalEarnings / MONTHLY_DATA.length).toFixed(0)}</div>
            <CardDescription>Per month</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Earnings</CardTitle>
            <CardDescription>
              Revenue breakdown by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={CHART_CONFIG}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={MONTHLY_DATA}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="earnings" name="earnings" fill="var(--color-earnings)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Event Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Event Type Distribution</CardTitle>
            <CardDescription>
              Breakdown of bookings by event type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={EVENT_TYPE_DATA}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {EVENT_TYPE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Booking Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
            <CardDescription>
              Completed vs canceled bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={CHART_CONFIG}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={BOOKING_TREND_DATA}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      name="completed"
                      stroke="var(--color-completed)"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="canceled"
                      name="canceled"
                      stroke="var(--color-canceled)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Latest Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your most recent bookings and payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {RECENT_TRANSACTIONS.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{transaction.customerName}</p>
                    <p className="text-xs text-gray-500">{transaction.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">${transaction.amount}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-sm">
        <p className="text-sm">{`$${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default EarningsOverview;
