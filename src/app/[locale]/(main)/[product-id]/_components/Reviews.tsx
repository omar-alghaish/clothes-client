import React from "react";
import RatingDisplay from "./Rating";
import ReviewList, { ReviewProps } from "./ReviewsList";

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

const ratingData = {
  averageRating: 4.8,
  totalReviews: 107,
  ratingCounts: {
    5: 70, // Approximately 65% based on the progress bar
    4: 35, // Approximately 33%
    3: 15, // Approximately 14%
    2: 7, // Approximately 7%
    1: 2, // Approximately 2%
  },
};

const reviewsData: ReviewProps[] = [
  {
    id: "1",
    reviewer: {
      name: "Reem Elabd",
      avatar: "/avatars/reem.jpg",
    },
    rating: 4,
    date: "04/03/2024",
    color: "Black",
    size: "M",
    content:
      "This T-shirt is stylish and comfortable! The fabric is soft, and it fits just right. The design is unique and stands out, making it easy to dress up or down. Plus, it feels durable, so it's perfect for everyday wear. Definitely a favorite.",
  },
  {
    id: "2",
    reviewer: {
      name: "Sara Salah",
      avatar: "/avatars/sara.jpg",
    },
    rating: 4,
    date: "03/28/2024",
    color: "Gray",
    size: "L",
    content:
      "Love this T-shirt! The style is fresh and versatile, perfect for pairing with different outfits. The material is super soft, making it comfortable all day long. Fits just right—not too loose or tight—and the quality is solid for regular wear.",
  },
  {
    id: "3",
    reviewer: {
      name: "Dohaa Wageh",
      avatar: "/avatars/dohaa.jpg",
    },
    rating: 4,
    date: "03/15/2024",
    color: "Blue",
    size: "XL",
    content:
      "This T-shirt is awesome! The look is simple yet stylish, making it easy to wear for any occasion. The fabric feels really nice on the skin, and the fit is spot on. It's lightweight but durable, so it holds up well even after washing.",
  },
];

const ReviewList1: React.FC<ReviewListProps> = ({ showingText }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">
        Review List ({showingText})
      </h3>
      <RatingDisplay
        averageRating={ratingData.averageRating}
        totalReviews={ratingData.totalReviews}
        ratingCounts={ratingData.ratingCounts}
      />
      <ReviewList
        reviews={reviewsData}
        totalReviews={24}
        className=" mx-auto"
      />

      {/* <ReviewForm
        colors={[]}
        sizes={[]}
        productDetails={{
          color: "",
          size: "",
        }}
      /> */}
    </div>
  );
};

export default ReviewList1;
