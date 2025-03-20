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
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDeleteReview = async (reviewId: string) => {
    await deleteReview(reviewId);
    fetchReviews();
  };

  return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">My Reviews</h2>
        {reviews.length === 0 ? (
            <p className="text-center">You haven't written any reviews yet.</p>
        ) : (
            reviews.map((review) => (
                <MyReviewCard
                    key={review.id}
                    {...review}
                    deleteReview={handleDeleteReview}
                />
            ))
        )}
      </div>
  );
};

export default MyReviews;