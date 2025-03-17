import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Review } from "../../../services/review-service";
import UserAndTimestampCardHeader from "../../UserAndTimestampCardHeader";
import ReviewCardBody from "../ReviewCardBody";
import { getSuggestionsByTitle } from "../../../services/tv-show-service"; // Import the new function

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
    const [suggestion, setSuggestion] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleEditClick = () => {
        navigate(`/editReview/${id}`);
    };

    const handleGetSuggestions = () => {
        setLoading(true);
        setError("");

        getSuggestionsByTitle(tvShowTitle)
            .then((data) => {
                setSuggestion(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load suggestions. Please try again.");
                setLoading(false);
                console.error("Error fetching suggestions:", err);
            });
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
                        className="btn btn-outline-success me-2"
                        onClick={handleGetSuggestions}
                        data-bs-toggle="modal"
                        data-bs-target={`#suggestionsModal${id}`}
                    >
                        <i className="bi bi-lightbulb me-2"></i>
                        Suggestions
                    </button>
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

            {/* Delete Modal - keeping this unchanged */}
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

            {/* Suggestions Modal */}
            <div
                className="modal fade"
                id={`suggestionsModal${id}`}
                tabIndex={-1}
                aria-labelledby={`suggestionsModalLabel${id}`}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`suggestionsModalLabel${id}`}>
                                Similar to "{tvShowTitle}"
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {loading && (
                                <div className="text-center py-4">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            {!loading && !error && suggestion === "" && (
                                <p className="text-center text-muted">
                                    Click "Get Suggestions" to see shows similar to {tvShowTitle}
                                </p>
                            )}

                            {!loading && !error && suggestion !== "" && (
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">AI Suggestion</h5>
                                        <p className="card-text">{suggestion}</p>
                                    </div>
                                </div>
                            )}
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
                                className="btn btn-primary"
                                onClick={handleGetSuggestions}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-arrow-repeat me-2"></i>
                                        Get Suggestions
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyReviewCard;