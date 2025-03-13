
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Edit2, ThumbsUp, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  vendorId: string;
  vendorName: string;
  serviceType: string;
  rating: number;
  content: string;
  date: string;
  helpfulCount: number;
  replies: number;
}

const CustomerReviews = () => {
  // Mock data for reviews
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      vendorId: '1',
      vendorName: 'Stellar Events & Photography',
      serviceType: 'Wedding Photography',
      rating: 5,
      content: 'Amazing service! The photos captured our special day perfectly. The photographer was professional and made everyone feel comfortable.',
      date: '2023-08-10',
      helpfulCount: 4,
      replies: 1
    },
    {
      id: '2',
      vendorId: '2',
      vendorName: 'Magic Moments Entertainment',
      serviceType: 'Birthday Party Entertainment',
      rating: 4,
      content: 'The magician was great and all the kids loved the show. Only giving 4 stars because they arrived a bit late, but they made up for it with an excellent performance.',
      date: '2023-07-15',
      helpfulCount: 2,
      replies: 1
    },
    {
      id: '3',
      vendorId: '3',
      vendorName: 'Sweet Delights Bakery',
      serviceType: 'Birthday Cake',
      rating: 5,
      content: 'The cake was absolutely delicious and looked exactly like what we requested. It was the highlight of the party!',
      date: '2023-06-20',
      helpfulCount: 5,
      replies: 0
    }
  ]);

  const markHelpful = (id: string) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, helpfulCount: review.helpfulCount + 1 } : review
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Reviews</CardTitle>
          <CardDescription>Reviews you've left for vendors</CardDescription>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="text-center py-10">
              <Star className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Reviews Yet</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                You haven't left any reviews for vendors yet.
              </p>
              <Button>
                Browse Past Bookings
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{review.vendorName}</h3>
                        <p className="text-sm text-muted-foreground">{review.serviceType}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm">{review.content}</p>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
                      <span>Posted on {review.date}</span>
                      <div className="flex gap-4">
                        <button className="flex items-center hover:text-primary" onClick={() => markHelpful(review.id)}>
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{review.helpfulCount} Helpful</span>
                        </button>
                        <button className="flex items-center hover:text-primary">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{review.replies} {review.replies === 1 ? 'Reply' : 'Replies'}</span>
                        </button>
                        <button className="flex items-center hover:text-primary">
                          <Edit2 className="h-4 w-4 mr-1" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerReviews;
