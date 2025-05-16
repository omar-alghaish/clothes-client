// ReviewList.tsx (Updated)
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star as StarFilledIcon, StarIcon } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

export interface ReviewProps {
  id: string;
  reviewer: {
    name: string;
    avatar: string | null;
  };
  rating: number;
  date: string;
  color?: string;
  size?: string;
  content: string;
}

interface ReviewListProps {
  reviews: ReviewProps[];
  totalReviews?: number;
  className?: string;
  isLoading?: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews = [],
  totalReviews = 0,
  className = "",
  isLoading = false,
}) => {
  const [sortBy, setSortBy] = React.useState("newest");
  const displayedReviews = reviews.slice(0, 4);
  const hasMoreReviews = totalReviews > displayedReviews.length;

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    // Handle half stars by rounding to nearest 0.5
    const roundedRating = Math.round(rating * 2) / 2;
    
    for (let i = 1; i <= 5; i++) {
      // For full stars
      if (i <= Math.floor(roundedRating)) {
        stars.push(
          <StarFilledIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } 
      // For empty stars
      else {
        stars.push(
          <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
        );
      }
    }
    return stars;
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-center py-8">No reviews yet</div>;
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl font-semibold">
          Review List{" "}
          <span className="text-sm font-normal text-gray-500">
            (Showing 1-{displayedReviews.length} of {totalReviews} results)
          </span>
        </h2>

        <div className="mt-2 sm:mt-0 flex items-center">
          <span className="mr-2 text-sm">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <Card key={review.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar
                  src={review.reviewer.avatar}
                  alt={review.reviewer.name}
                  size={12}
                  shape="circle"
                />

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{review.reviewer.name}</h3>
                      {(review.color || review.size) && (
                        <p className="text-sm text-gray-500">
                          {review.color && `Color: ${review.color}`} 
                          {review.color && review.size && " / "} 
                          {review.size && `Size: ${review.size}`}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:items-end mt-1 sm:mt-0">
                      <div className="flex mb-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-xs text-gray-500">
                        {review.date}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-gray-700">
                      {review.content.length > 150 ? (
                        <>
                          {review.content.substring(0, 150)}...
                          <button className="text-blue-500 hover:underline">
                            See More
                          </button>
                        </>
                      ) : (
                        review.content
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMoreReviews && (
        <div className="mt-4 text-center">
          <button className="text-blue-500 hover:underline flex items-center justify-center mx-auto">
            See more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;