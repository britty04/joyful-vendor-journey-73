
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

// Sample ticket data
const tickets = [
  {
    id: 'TKT-123456',
    subject: 'Refund for cancelled event',
    category: 'refund',
    priority: 'high',
    status: 'open',
    createdAt: new Date(2023, 9, 15),
  },
  {
    id: 'TKT-123457',
    subject: 'Vendor not responding to messages',
    category: 'vendor',
    priority: 'medium',
    status: 'in-progress',
    createdAt: new Date(2023, 9, 14),
  },
  {
    id: 'TKT-123458',
    subject: 'Payment failed but money deducted',
    category: 'payment',
    priority: 'urgent',
    status: 'open',
    createdAt: new Date(2023, 9, 13),
  },
  {
    id: 'TKT-123459',
    subject: 'Unable to select date for booking',
    category: 'technical',
    priority: 'low',
    status: 'closed',
    createdAt: new Date(2023, 9, 10),
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'low':
      return 'bg-blue-100 text-blue-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-orange-100 text-orange-800';
    case 'urgent':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-purple-100 text-purple-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'closed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'booking':
      return 'Booking Issue';
    case 'payment':
      return 'Payment Problem';
    case 'vendor':
      return 'Vendor Complaint';
    case 'refund':
      return 'Refund Request';
    case 'technical':
      return 'Technical Support';
    default:
      return 'Other';
  }
};

const TicketsList = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6">Your Support Tickets</h2>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{getCategoryLabel(ticket.category)}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getPriorityColor(ticket.priority)}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(ticket.status)}>
                    {ticket.status === 'in-progress' ? 'In Progress' : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{ticket.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {tickets.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't created any support tickets yet.</p>
        </div>
      )}
    </div>
  );
};

export default TicketsList;
