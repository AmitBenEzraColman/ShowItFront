import React from "react";

interface ReviewCardBodyProps {
  reviewImgUrl: string;
  tvShowTitle: string;
  score: number;
  description: string;
}

const ReviewCardBody: React.FC<ReviewCardBodyProps> = ({
  description,
  tvShowTitle,
  reviewImgUrl,
  score,
}) => {
  return (
    <div>
      <img
        src={reviewImgUrl}
        className="card-img-top mt-2"
        height="200"
        style={{ backgroundColor: "#e3f2fd" }}
      />
      <div className="card-body ps-0">
        <p className="h5 my-0">TV Show Title: {tvShowTitle}</p>
        <span className="fw-bold me-2">Score:</span>
        {Array.from({ length: score }, (_) => (
          <i className="bi bi-star-fill me-1" style={{ color: "#ecc94b" }} />
        ))}

        {Array.from({ length: 5 - score }, (_) => (
          <i className="bi bi-star me-1" style={{ color: "#ecc94b" }} />
        ))}

        <p className="card-text mt-2 multiline">{description}</p>
      </div>
    </div>
  );
};

export default ReviewCardBody;
