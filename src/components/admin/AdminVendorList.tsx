
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Eye, UserCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Vendor {
  id: string;
  name: string;
  email: string;
  businessType: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
}

export const AdminVendorList = () => {
  // Mock data for vendor applications
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'Stellar Events & Photography',
      email: 'contact@stellarevents.com',
      businessType: 'Photography',
      status: 'pending',
      submittedDate: '2023-09-15',
    },
    {
      id: '2',
      name: 'Magic Moments Entertainment',
      email: 'info@magicmoments.com',
      businessType: 'Entertainment',
      status: 'pending',
      submittedDate: '2023-09-14',
    },
    {
      id: '3',
      name: 'Sweet Delights Bakery',
      email: 'orders@sweetdelights.com',
      businessType: 'Catering',
      status: 'pending',
      submittedDate: '2023-09-12',
    },
    {
      id: '4',
      name: 'Bloom Floral Designs',
      email: 'hello@bloomflorals.com',
      businessType: 'Floristry',
      status: 'pending',
      submittedDate: '2023-09-10',
    },
    {
      id: '5',
      name: 'Elite Sound DJ Services',
      email: 'bookings@elitesound.com',
      businessType: 'Music',
      status: 'pending',
      submittedDate: '2023-09-08',
    },
    {
      id: '6',
      name: 'Grand Venue Hall',
      email: 'events@grandvenue.com',
      businessType: 'Venue',
      status: 'approved',
      submittedDate: '2023-09-05',
    },
    {
      id: '7',
      name: 'Celebration Decorators',
      email: 'info@celebrationdecorators.com',
      businessType: 'Decor',
      status: 'approved',
      submittedDate: '2023-09-03',
    },
    {
      id: '8',
      name: 'Party Planners Pro',
      email: 'contact@partyplannerspro.com',
      businessType: 'Planning',
      status: 'rejected',
      submittedDate: '2023-09-01',
    },
  ]);

  const updateVendorStatus = (id: string, newStatus: 'approved' | 'rejected') => {
    setVendors(vendors.map(vendor => 
      vendor.id === id ? { ...vendor, status: newStatus } : vendor
    ));
    
    toast({
      title: `Vendor ${newStatus === 'approved' ? 'Approved' : 'Rejected'}`,
      description: `The vendor has been successfully ${newStatus}.`,
    });
  };

  // Filter vendors by status
  const pendingVendors = vendors.filter(v => v.status === 'pending');
  const approvedVendors = vendors.filter(v => v.status === 'approved');
  const rejectedVendors = vendors.filter(v => v.status === 'rejected');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vendor Applications</CardTitle>
          <CardDescription>Review and manage vendor applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Business Type</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>{vendor.businessType}</TableCell>
                    <TableCell>{vendor.submittedDate}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100" onClick={() => updateVendorStatus(vendor.id, 'approved')}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100" onClick={() => updateVendorStatus(vendor.id, 'rejected')}>
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {pendingVendors.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No pending vendors</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {approvedVendors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Approved Vendors</CardTitle>
            <CardDescription>Vendors that have been approved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Business Type</TableHead>
                    <TableHead>Approved Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="font-medium">{vendor.name}</TableCell>
                      <TableCell>{vendor.businessType}</TableCell>
                      <TableCell>{vendor.submittedDate}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Approved
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      
      {rejectedVendors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Rejected Vendors</CardTitle>
            <CardDescription>Vendors that have been rejected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Business Type</TableHead>
                    <TableHead>Rejected Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rejectedVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="font-medium">{vendor.name}</TableCell>
                      <TableCell>{vendor.businessType}</TableCell>
                      <TableCell>{vendor.submittedDate}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Rejected
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100" onClick={() => updateVendorStatus(vendor.id, 'approved')}>
                          <UserCheck className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
