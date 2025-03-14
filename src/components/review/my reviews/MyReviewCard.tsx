import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Review } from "../../../services/review-service";
import UserAndTimestampCardHeader from "../../UserAndTimestampCardHeader";
import ReviewCardBody from "../ReviewCardBody";

interface MyReviewCardProps extends Review {
  deleteReview: (reviewId: string) => void;
}

const MyReviewCard: React.FC<MyReviewCardProps> = ({
                                                     id,
                                                     tvShowTitle,
                                                     description,
                                                     score,
                                                     reviewImgUrl,
                                                     timeStamp,
                                                     author,
                                                     deleteReview,
                                                   }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/editReview/${id}`);
  };

  return (
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <UserAndTimestampCardHeader author={author} timeStamp={timeStamp} />
          <ReviewCardBody
              description={description}
              tvShowTitle={tvShowTitle}
              reviewImgUrl={reviewImgUrl}
              score={score}
          />
          <div className="d-flex justify-content-end mt-3">
            <button
                type="button"
                className="btn btn-outline-primary me-2"
                onClick={handleEditClick}
            >
              <i className="bi bi-pencil me-2"></i>
              Edit
            </button>
            <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-toggle="modal"
                data-bs-target={`#deleteModal${id}`}
            >
              <i className="bi bi-trash me-2"></i>
              Delete
            </button>
          </div>
        </div>
        <div
            className="modal fade"
            id={`deleteModal${id}`}
            tabIndex={-1}
            aria-labelledby={`deleteModalLabel${id}`}
            aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`deleteModalLabel${id}`}>
                  Delete Review
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Are you sure that you want to delete this review?
              </div>
              <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteReview(id)}
                    data-bs-dismiss="modal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MyReviewCard;