
import { Star } from "lucide-react";
import React, { FC } from "react";

interface RatingProps {
  rating: number | string;
  size?: "sm" | "lg";
  className?: string;
}

const Rating: FC<RatingProps> = ({ rating, size = "sm", className }) => {
  const numericRating = typeof rating === "string" ? parseFloat(rating) : rating;
  const clampedRating = Math.min(5, Math.max(0, numericRating));

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: 5 }, (_, index) => {
        const fillAmount = Math.min(1, Math.max(0, clampedRating - index));
        const fillPercentage = `${fillAmount * 100}%`;

        return (
          <span key={index} className={`relative ${
            size === "sm" ? "w-4 h-4" : "w-6 h-6"
          }`}>
            {/* Empty Star */}
            <Star
              className="absolute top-0 left-0 w-full h-full text-gray-300"
              strokeWidth={1.5}
              fill="transparent"
            />
            
            {/* Filled Star */}
            <Star
              className="absolute top-0 left-0 w-full h-full text-primary"
              strokeWidth={1.5}
              fill="currentColor"
              style={{
                mask: `linear-gradient(to right, black ${fillPercentage}, transparent 0%)`,
                WebkitMask: `linear-gradient(to right, black ${fillPercentage}, transparent 0%)`,
              }}
            />
          </span>
        );
      })}
    </div>
  );
};

export default Rating;