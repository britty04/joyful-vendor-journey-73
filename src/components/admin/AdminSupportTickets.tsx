import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  MessageSquare, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Filter 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

// Sample ticket data
const tickets = [
  {
    id: 'TKT-123456',
    subject: 'Refund for cancelled event',
    category: 'refund',
    priority: 'high',
    status: 'open',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.s@example.com',
    description: 'I had booked tickets for the concert on July 15th which was cancelled. I haven\'t received my refund yet. Please help.',
    createdAt: new Date(2023, 9, 15),
  },
  {
    id: 'TKT-123457',
    subject: 'Vendor not responding to messages',
    category: 'vendor',
    priority: 'medium',
    status: 'in-progress',
    customerName: 'Priya Patel',
    customerEmail: 'priya.p@example.com',
    description: 'I\'ve been trying to contact the vendor "Magic Moments Entertainment" for the past week but haven\'t received any response.',
    createdAt: new Date(2023, 9, 14),
  },
  {
    id: 'TKT-123458',
    subject: 'Payment failed but money deducted',
    category: 'payment',
    priority: 'urgent',
    status: 'open',
    customerName: 'Amir Khan',
    customerEmail: 'amir.k@example.com',
    description: 'I tried to book a venue but the payment failed. However, the amount was deducted from my account. Transaction ID: TX78945612.',
    createdAt: new Date(2023, 9, 13),
  },
  {
    id: 'TKT-123459',
    subject: 'Unable to select date for booking',
    category: 'technical',
    priority: 'low',
    status: 'closed',
    customerName: 'Maya Verma',
    customerEmail: 'maya.v@example.com',
    description: 'The calendar on vendor\'s page is not allowing me to select any date. I tried on different browsers but it\'s not working.',
    createdAt: new Date(2023, 9, 10),
  },
  {
    id: 'TKT-123460',
    subject: 'Vendor quality issues',
    category: 'vendor',
    priority: 'high',
    status: 'open',
    customerName: 'Raj Malhotra',
    customerEmail: 'raj.m@example.com',
    description: 'The decoration vendor "Celebration Decorators" didn\'t provide the services as promised. The quality was very poor compared to what was shown in pictures.',
    createdAt: new Date(2023, 9, 8),
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

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'booking':
      return <Clock className="h-4 w-4" />;
    case 'payment':
      return <AlertTriangle className="h-4 w-4" />;
    case 'vendor':
      return <AlertTriangle className="h-4 w-4" />;
    case 'refund':
      return <AlertTriangle className="h-4 w-4" />;
    case 'technical':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

const AdminSupportTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTickets = filter === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === filter);

  const viewTicketDetails = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsDialogOpen(true);
  };

  const handleReply = () => {
    if (!replyText) {
      toast({
        title: "Empty response",
        description: "Please enter a reply message.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would send this reply to an API
    toast({
      title: "Reply sent",
      description: `Your response to ticket ${selectedTicket.id} has been sent.`,
    });

    setReplyText('');
    setIsDialogOpen(false);
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    // In a real app, you would update the ticket status via an API
    toast({
      title: "Status updated",
      description: `Ticket ${ticketId} status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Support Tickets</h2>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select 
            className="border rounded px-2 py-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.customerName}</TableCell>
                <TableCell className="max-w-[200px] truncate">{ticket.subject}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {getCategoryIcon(ticket.category)}
                    {getCategoryLabel(ticket.category)}
                  </div>
                </TableCell>
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
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => viewTicketDetails(ticket)}>
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  {ticket.status !== 'closed' && (
                    <Button variant="ghost" size="sm" onClick={() => handleStatusChange(ticket.id, 'closed')}>
                      <CheckCircle className="h-4 w-4 mr-1" /> Close
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredTickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                  No tickets found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Ticket: {selectedTicket.id}</span>
                  <Badge variant="outline" className={getStatusColor(selectedTicket.status)}>
                    {selectedTicket.status === 'in-progress' ? 'In Progress' : selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Customer</p>
                      <p className="font-medium">{selectedTicket.customerName}</p>
                      <p className="text-sm">{selectedTicket.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Details</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm">Category: {getCategoryLabel(selectedTicket.category)}</p>
                        <p className="text-sm">•</p>
                        <Badge variant="secondary" className={getPriorityColor(selectedTicket.priority)}>
                          {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)} Priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="border-t border-b py-4 my-4">
                <h3 className="font-semibold mb-2">{selectedTicket.subject}</h3>
                <p className="text-gray-700 whitespace-pre-line">{selectedTicket.description}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Reply to Customer
                </h4>
                <Textarea
                  placeholder="Type your response here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={5}
                />
              </div>

              <DialogFooter className="flex items-center justify-between">
                <div className="flex gap-2">
                  {selectedTicket.status !== 'closed' && (
                    <Button variant="outline" onClick={() => handleStatusChange(selectedTicket.id, 'closed')}>
                      <CheckCircle className="h-4 w-4 mr-1" /> Close Ticket
                    </Button>
                  )}
                  {selectedTicket.status === 'open' && (
                    <Button variant="outline" onClick={() => handleStatusChange(selectedTicket.id, 'in-progress')}>
                      Mark as In Progress
                    </Button>
                  )}
                </div>
                <Button onClick={handleReply}>Send Reply</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSupportTickets;
