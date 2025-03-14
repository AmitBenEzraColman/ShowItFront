import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Review } from "../../services/review-service";
import LikeAndCommentReview from "./feed/LikeAndCommentReview";
import UserAndTimestampCardHeader from "../UserAndTimestampCardHeader";
import ReviewCardBody from "./ReviewCardBody";

interface ReviewCardProps extends Review {
  likeReview?: () => void;
  unlikeReview?: () => void;
  showLikesAndComments: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  tvShowTitle,
  description,
  score,
  reviewImgUrl,
  timeStamp,
  author,
  likes,
  comments,
  isLiked,
  showLikesAndComments,
  likeReview,
  unlikeReview,
}) => {
  const navigate = useNavigate();

  const handleCommentClick = () => {
    navigate(`/comments/${id}`);
  };

  const handleLikeClick = () => {
    isLiked ? unlikeReview!() : likeReview!();
  };

  return (
    <div className="card w-50 mx-auto my-3 px-4 py-3">
      <UserAndTimestampCardHeader author={author} timeStamp={timeStamp} />
      <ReviewCardBody
        description={description}
        tvShowTitle={tvShowTitle}
        reviewImgUrl={reviewImgUrl}
        score={score}
      />
      {showLikesAndComments && (
        <LikeAndCommentReview
          isLiked={isLiked}
          handleLikeClick={handleLikeClick}
          likesCount={likes}
          handleCommentClick={handleCommentClick}
          commentsCount={comments?.length}
        />
      )}
    </div>
  );
};

export default ReviewCard;
