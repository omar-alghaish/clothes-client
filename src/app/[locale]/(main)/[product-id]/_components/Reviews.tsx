// ReviewList1.tsx (Wrapper Component)
import React from "react";
import RatingDisplay from "./Rating";
import ReviewList, { ReviewProps } from "./ReviewsList";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { format } from "date-fns";

interface ApiReview {
  _id: string;
  comment: string;
  createdAt: string;
  rating: number;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarFile: string;
  };
  item: {
    _id: string;
    img: string;
  };
}

interface ReviewListProps {
  reviews: ApiReview[] | undefined;
  showingText: string;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  totalReviews: number;
}

const fallbackReviews: ReviewProps[] = [
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

const ReviewList1: React.FC<ReviewListProps> = ({
  showingText,
  reviews,
  isLoading,
  totalReviews,
}) => {
  const ratingData = React.useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingCounts: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
      };
    }

    const ratingCounts = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    const totalRating = reviews.reduce((sum, review) => {
      const roundedRating = Math.round(review.rating);

      if (roundedRating >= 1 && roundedRating <= 5) {
        ratingCounts[roundedRating as keyof typeof ratingCounts] += 1;
      }

      return sum + review.rating;
    }, 0);

    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    return {
      averageRating,
      totalReviews: reviews.length,
      ratingCounts,
    };
  }, [reviews]);

  const transformedReviews: ReviewProps[] = React.useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return [];
    }

    return reviews.map((review) => {
      const formattedDate = review.createdAt
        ? format(new Date(review.createdAt), "MM/dd/yyyy")
        : "N/A";

      return {
        id: review._id,
        reviewer: {
          name: `${review.user.firstName} ${review.user.lastName}`,
          avatar: review.user.avatarFile
            ? `/avatars/${review.user.avatarFile}`
            : null,
        },
        rating: review.rating,
        date: formattedDate,
        content: review.comment,
      };
    });
  }, [reviews]);

  const reviewsToShow = transformedReviews.length > 0
    ? transformedReviews
    : (!isLoading && !reviews) ? fallbackReviews : [];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">
        Review List ({showingText})
      </h3>

      <RatingDisplay
        ratingData={ratingData}
      />

      <ReviewList
        reviews={reviewsToShow}
        totalReviews={totalReviews || reviewsToShow.length}
        className="mx-auto"
        isLoading={isLoading}
      />
    </div>
  );
};

export default ReviewList1;