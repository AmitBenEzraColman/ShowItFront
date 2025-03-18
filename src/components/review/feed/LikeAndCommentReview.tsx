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
      <div className="card-footer bg-transparent border-top-0">
        <div className="d-flex justify-content-between">
          <button
              type="button"
              className={`btn btn-sm ${isLiked ? "btn-danger" : "btn-outline-danger"}`}
              onClick={handleLikeClick}
          >
            <i className={`bi ${isLiked ? "bi-heart-fill" : "bi-heart"} me-1`} />
            {likesCount}
          </button>
          <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleCommentClick}
          >
            <i className="bi bi-chat me-1" />
            {commentsCount}
          </button>
        </div>
      </div>
  );
};

export default LikeAndCommentReview;