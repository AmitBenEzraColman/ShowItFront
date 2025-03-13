import React, { useEffect, useState } from "react";
import MyReviewCard from "./MyReviewCard";
import {
  Review,
  deleteReview,
  getConnectedUserReviews,
} from "../../../services/review-service";

const MyReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    try {
      const reviews = await getConnectedUserReviews();
      setReviews(reviews);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handledeleteReview = async (reviewId: string) => {
    await deleteReview(reviewId);
    fetchReviews();
  };

  return (
    <>
      {reviews.map((review) => (
        <MyReviewCard
          key={review.id}
          {...review}
          deleteReview={handledeleteReview}
        />
      ))}
    </>
  );
};

export default MyReviews;
