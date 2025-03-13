import React, { useEffect, useState } from "react";
import {
    Review,
    getAllReviews,
    likeReview,
    unlikeReview,
} from "../../services/review-service";

const Feed: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviews = await getAllReviews();
                console.log(reviews);
                setReviews(reviews);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchReviews();
    }, []);

    const handleReviewLike = async (reviewId: string) => {
        await likeReview(reviewId);
        const updatedReviews = reviews.map((review) => {
            if (review.id === reviewId) {
                return {
                    ...review,
                    likes: review.likes + 1,
                    isLiked: true,
                };
            }
            return review;
        });
        setReviews(updatedReviews);
    };

    const handleReviewUnlike = async (reviewId: string) => {
        await unlikeReview(reviewId);
        const updatedReviews = reviews.map((review) => {
            if (review.id === reviewId) {
                return {
                    ...review,
                    likes: review.likes - 1,
                    isLiked: false,
                };
            }
            return review;
        });
        setReviews(updatedReviews);
    };

    return (
        <>
            {reviews.map((review) => (
                <div>{review.id}</div>
            ))}
        </>
    );
};

export default Feed;
