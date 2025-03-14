import React from "react";

interface LikeAndCommentReviewProps {
  isLiked: boolean;
  handleLikeClick: () => void;
  likesCount: number;
  handleCommentClick: () => void;
  commentsCount: number;
}

const LikeAndCommentReview: React.FC<LikeAndCommentReviewProps> = ({
  isLiked,
  handleLikeClick,
  likesCount,
  handleCommentClick,
  commentsCount,
}) => {
  return (
    <div className="text-center py-3">
      <div className="d-flex justify-content-center gap-3">
        <button
          type="button"
          className={`btn ${(isLiked && "btn-danger") || "btn-outline-danger"}`}
          onClick={handleLikeClick}
        >
          <i
            className={`me-2 align-middle bi ${
              (isLiked && "bi-heart-fill") || "bi-heart"
            }`}
          />
          Like
          <div className="vr mx-2 align-middle"></div>
          {likesCount}
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={handleCommentClick}
        >
          <i className="bi bi-chat me-2 align-middle" />
          Comment
          <div className="vr mx-2 align-middle"></div>
          {commentsCount}
        </button>
      </div>
    </div>
  );
};

export default LikeAndCommentReview;
