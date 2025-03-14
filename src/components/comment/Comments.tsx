import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { Review, getReviewById } from "../../services/review-service";
import ReviewCard from "../review/ReviewCard";

const Comments: React.FC = () => {
    const [review, setReview] = useState<Review | null>(null);

    const { reviewId } = useParams<{ reviewId: string }>();

    const fetchReview = async () => {
        try {
            if (reviewId !== undefined) {
                const review = await getReviewById(reviewId);
                setReview(review);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        fetchReview();
    }, []);

    return (
        <div className="container mt-4">
            {review && (
                <div className="mb-4">
                    <ReviewCard {...review} showLikesAndComments={false} />
                </div>
            )}
            <h3 className="text-center mb-4">Comments</h3>
            <CommentForm
                reviewId={reviewId}
                postCommentCallback={() => fetchReview()}
            />
            <div className="comment-list">
                {review?.comments
                    .sort(
                        (a, b) =>
                            new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
                    )
                    .map((comment, index) => (
                        <CommentCard key={index} {...comment} />
                    ))}
            </div>
        </div>
    );
};

export default Comments;