// components/Rating.tsx
import React from 'react';
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RatingData {
  averageRating: number;
  totalReviews: number;
  ratingCounts: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface RatingDisplayProps {
  ratingData: RatingData;
  className?: string;
  maxRating?: number;
}

export const RatingDisplay = ({
  maxRating = 5,
  ratingData,
  className,
}: RatingDisplayProps) => {
  const { averageRating, totalReviews, ratingCounts } = ratingData;

  // Calculate percentages for progress bars
  const getPercentage = (count: number) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  return (
    <div className={cn("flex flex-col md:flex-row gap-6 p-4 w-full", className)}>
      {/* Left section - Average rating and stars */}
      <div className="flex flex-col items-center justify-center min-w-40">
        <div className='flex items-end gap-2'>
          <h2 className="text-6xl font-bold tracking-tight">
            {averageRating.toFixed(1)}
          </h2>
          <div className="text-2xl">
            Out of {maxRating}
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          {Array.from({ length: maxRating }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-6 h-6 fill-current",
                i < Math.floor(averageRating)
                  ? "text-yellow-400"
                  : "text-gray-200"
              )}
            />
          ))}
        </div>
        
        <div className="text-sm text-muted-foreground mt-2">
          ({totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'})
        </div>
      </div>

      {/* Right section - Rating breakdown */}
      <div className="flex-1 flex flex-col justify-center space-y-3">
        {Array.from({ length: maxRating }).map((_, i) => {
          const rating = maxRating - i;
          const count = ratingCounts[rating as keyof typeof ratingCounts] || 0;
          const percentage = getPercentage(count);
          
          return (
            <div key={rating} className="flex items-center gap-2">
              <div className="w-20 text-sm font-medium">
                {rating} {rating === 1 ? 'Star' : 'Stars'}
              </div>
              <Progress
                value={percentage}
                className="h-2 flex-1"
              />
              <div className="w-12 text-sm text-right">
                {count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingDisplay;