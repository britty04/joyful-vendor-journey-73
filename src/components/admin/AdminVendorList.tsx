import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Eye, UserCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Vendor {
  id: string;
  name: string;
  email: string;
  businessType: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  details?: {
    description: string;
    yearsInBusiness: number;
    services: string[];
    location: string;
    contactNumber: string;
    socialMedia: {
      website?: string;
      instagram?: string;
      facebook?: string;
    };
    portfolio: string[];
  };
}

export const AdminVendorList = () => {
  // Mock data for vendor applications with extended details
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'Stellar Events & Photography',
      email: 'contact@stellarevents.com',
      businessType: 'Photography',
      status: 'pending',
      submittedDate: '2023-09-15',
      details: {
        description: 'Professional photography for weddings, corporate events, and special occasions. We specialize in capturing candid moments and creating timeless memories.',
        yearsInBusiness: 5,
        services: ['Wedding Photography', 'Event Coverage', 'Corporate Portraits', 'Photo Editing'],
        location: 'Mumbai, Maharashtra',
        contactNumber: '+91 9876543210',
        socialMedia: {
          website: 'www.stellarevents.com',
          instagram: '@stellarevents',
          facebook: 'StellarEventsPhotography'
        },
        portfolio: [
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
          'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6',
          'https://images.unsplash.com/photo-1519741497674-611481863552'
        ]
      }
    },
    {
      id: '2',
      name: 'Magic Moments Entertainment',
      email: 'info@magicmoments.com',
      businessType: 'Entertainment',
      status: 'pending',
      submittedDate: '2023-09-14',
      details: {
        description: 'We provide top-notch entertainment services for all types of events. From DJs to live bands, magicians to comedians, we have it all!',
        yearsInBusiness: 7,
        services: ['DJs', 'Live Bands', 'Magicians', 'Comedians', 'MC Services'],
        location: 'Delhi NCR',
        contactNumber: '+91 9876543211',
        socialMedia: {
          website: 'www.magicmoments.com',
          instagram: '@magicmomentsentertainment',
          facebook: 'MagicMomentsIndia'
        },
        portfolio: [
          'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
          'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
          'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4'
        ]
      }
    },
    {
      id: '3',
      name: 'Sweet Delights Bakery',
      email: 'orders@sweetdelights.com',
      businessType: 'Catering',
      status: 'pending',
      submittedDate: '2023-09-12',
      details: {
        description: 'Specializing in custom cakes, desserts, and catering for events of all sizes. We use only the finest ingredients to create delicious treats.',
        yearsInBusiness: 3,
        services: ['Custom Cakes', 'Dessert Tables', 'Wedding Cakes', 'Pastries', 'Event Catering'],
        location: 'Bangalore, Karnataka',
        contactNumber: '+91 9876543212',
        socialMedia: {
          website: 'www.sweetdelights.com',
          instagram: '@sweetdelightsbakery',
          facebook: 'SweetDelightsIndia'
        },
        portfolio: [
          'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3',
          'https://images.unsplash.com/photo-1546538994-4f15d0aa966f',
          'https://images.unsplash.com/photo-1535141192574-5d4897c12636'
        ]
      }
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

  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateVendorStatus = (id: string, newStatus: 'approved' | 'rejected') => {
    setVendors(vendors.map(vendor => 
      vendor.id === id ? { ...vendor, status: newStatus } : vendor
    ));
    
    setIsDialogOpen(false);
    
    toast({
      title: `Vendor ${newStatus === 'approved' ? 'Approved' : 'Rejected'}`,
      description: `The vendor has been successfully ${newStatus}.`,
    });
  };

  const viewVendorDetails = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsDialogOpen(true);
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
                      <Button size="sm" variant="outline" onClick={() => viewVendorDetails(vendor)}>
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
      
      {/* Vendor Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedVendor && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedVendor.name}</DialogTitle>
                <DialogDescription>
                  {selectedVendor.email} • {selectedVendor.businessType}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Business Description</h3>
                    <p className="mt-1">{selectedVendor.details?.description || "No description provided."}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Services Offered</h3>
                    {selectedVendor.details?.services ? (
                      <ul className="mt-1 list-disc list-inside space-y-1">
                        {selectedVendor.details.services.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1">No services listed.</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Business Information</h3>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p>{selectedVendor.details?.location || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Years in Business</p>
                        <p>{selectedVendor.details?.yearsInBusiness || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Contact</p>
                        <p>{selectedVendor.details?.contactNumber || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Application Date</p>
                        <p>{selectedVendor.submittedDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedVendor.details?.socialMedia && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Online Presence</h3>
                      <div className="mt-1 space-y-1">
                        {selectedVendor.details.socialMedia.website && (
                          <p className="text-sm">Website: {selectedVendor.details.socialMedia.website}</p>
                        )}
                        {selectedVendor.details.socialMedia.instagram && (
                          <p className="text-sm">Instagram: {selectedVendor.details.socialMedia.instagram}</p>
                        )}
                        {selectedVendor.details.socialMedia.facebook && (
                          <p className="text-sm">Facebook: {selectedVendor.details.socialMedia.facebook}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Portfolio</h3>
                  {selectedVendor.details?.portfolio && selectedVendor.details.portfolio.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedVendor.details.portfolio.map((image, index) => (
                        <img 
                          key={index} 
                          src={image} 
                          alt={`${selectedVendor.name} portfolio ${index + 1}`} 
                          className="rounded-md object-cover h-40 w-full"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-md p-4 text-center">
                      <p className="text-gray-500">No portfolio images provided</p>
                    </div>
                  )}
                </div>
              </div>
              
              <DialogFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
                
                {selectedVendor.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="bg-red-50 text-red-700 hover:bg-red-100"
                      onClick={() => updateVendorStatus(selectedVendor.id, 'rejected')}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button 
                      variant="outline" 
                      className="bg-green-50 text-green-700 hover:bg-green-100"
                      onClick={() => updateVendorStatus(selectedVendor.id, 'approved')}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                )}
                
                {selectedVendor.status === 'rejected' && (
                  <Button 
                    variant="outline" 
                    className="bg-green-50 text-green-700 hover:bg-green-100"
                    onClick={() => updateVendorStatus(selectedVendor.id, 'approved')}
                  >
                    <UserCheck className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
