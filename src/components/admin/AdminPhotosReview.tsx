
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Eye, Filter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Photo {
  id: string;
  vendorId: string;
  vendorName: string;
  thumbnail: string;
  description: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const AdminPhotosReview = () => {
  // Mock data for photo review
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      vendorId: '1',
      vendorName: 'Stellar Events & Photography',
      thumbnail: 'https://source.unsplash.com/random/300x300/?wedding',
      description: 'Wedding venue decoration',
      uploadDate: '2023-09-15',
      status: 'pending',
    },
    {
      id: '2',
      vendorId: '1',
      vendorName: 'Stellar Events & Photography',
      thumbnail: 'https://source.unsplash.com/random/300x300/?party',
      description: 'Birthday party photography',
      uploadDate: '2023-09-15',
      status: 'pending',
    },
    {
      id: '3',
      vendorId: '2',
      vendorName: 'Magic Moments Entertainment',
      thumbnail: 'https://source.unsplash.com/random/300x300/?magician',
      description: 'Magician performance',
      uploadDate: '2023-09-14',
      status: 'pending',
    },
    {
      id: '4',
      vendorId: '3',
      vendorName: 'Sweet Delights Bakery',
      thumbnail: 'https://source.unsplash.com/random/300x300/?cake',
      description: 'Wedding cake',
      uploadDate: '2023-09-12',
      status: 'pending',
    },
    {
      id: '5',
      vendorId: '4',
      vendorName: 'Bloom Floral Designs',
      thumbnail: 'https://source.unsplash.com/random/300x300/?flowers',
      description: 'Floral arrangements',
      uploadDate: '2023-09-10',
      status: 'pending',
    },
    {
      id: '6',
      vendorId: '5',
      vendorName: 'Elite Sound DJ Services',
      thumbnail: 'https://source.unsplash.com/random/300x300/?dj',
      description: 'DJ setup',
      uploadDate: '2023-09-08',
      status: 'pending',
    },
  ]);

  const updatePhotoStatus = (id: string, newStatus: 'approved' | 'rejected') => {
    setPhotos(photos.map(photo => 
      photo.id === id ? { ...photo, status: newStatus } : photo
    ));
    
    toast({
      title: `Photo ${newStatus === 'approved' ? 'Approved' : 'Rejected'}`,
      description: `The photo has been successfully ${newStatus}.`,
    });
  };

  // Filter pending photos
  const pendingPhotos = photos.filter(p => p.status === 'pending');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Photo Review</CardTitle>
              <CardDescription>Approve or reject photos uploaded by vendors</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingPhotos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={photo.thumbnail} 
                    alt={photo.description}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-1">{photo.description}</h3>
                  <p className="text-sm text-muted-foreground">{photo.vendorName}</p>
                  <p className="text-xs text-muted-foreground mt-1">Uploaded: {photo.uploadDate}</p>
                  
                  <div className="flex justify-between mt-4">
                    <Button size="sm" variant="outline" onClick={() => updatePhotoStatus(photo.id, 'rejected')}>
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button size="sm" onClick={() => updatePhotoStatus(photo.id, 'approved')}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            
            {pendingPhotos.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No pending photos to review</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
