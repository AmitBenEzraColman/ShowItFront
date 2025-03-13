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
    <div className="card w-50 mx-auto my-3 px-4 py-3">
      <UserAndTimestampCardHeader author={author} timeStamp={timeStamp} />
      <ReviewCardBody
        description={description}
        tvShowTitle={tvShowTitle}
        reviewImgUrl={reviewImgUrl}
        score={score}
      />
      <div className="text-center py-3">
        <div className="d-flex justify-content-center gap-3">
          <button
            type="button"
            className={"btn btn-outline-dark"}
            onClick={handleEditClick}
          >
            <i className="bi bi-pencil me-2 align-middle"></i>
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="bi bi-trash me-2 align-middle"></i>
            Delete
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Delete Review
                  </h1>
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
                    Close
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
      </div>
    </div>
  );
};

export default MyReviewCard;
