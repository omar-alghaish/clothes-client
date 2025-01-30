import Avatar from "@/components/ui/Avatar";
import React from "react";
import ReviewForm from "./ReviewForm";

interface Review {
  id: string;
  user: string;
  comment: string;
  color: string;
  size: string;
  date: string;
  avatar?: string;
}

interface ReviewListProps {
  reviews: Review[];
  showingText: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, showingText }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">
        Review List ({showingText})
      </h3>

      <div className="space-y-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-6 last:border-b-0 space-y-4"
          >
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Avatar  src={review.avatar} alt={review.user} />
                <div className="space-y-1">
                  <h4 className="font-semibold text-gray-800">{review.user}</h4>
                  <p className="text-gray-500">
                    Color: {review.color} / Size: {review.size}
                  </p>
                </div>
              </div>

              <span className="text-gray-500">{review.date}</span>
            </div>
            <p className="text-gray-600 mb-4 whitespace-pre-line">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
      <ReviewForm colors={[]} sizes={[]} productDetails={{
              color: "",
              size: ""
          }}  />
    </div>
  );
};

export default ReviewList;
