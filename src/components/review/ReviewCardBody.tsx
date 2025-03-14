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
        <div className="card-body">
            <img
                src={reviewImgUrl}
                className="card-img-top mb-3 rounded"
                alt={tvShowTitle}
                style={{ objectFit: "cover", height: "200px" }}
            />
            <h5 className="card-title">{tvShowTitle}</h5>
            <div className="mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                    <i
                        key={i}
                        className={`bi ${i < score ? "bi-star-fill" : "bi-star"} text-warning`}
                    />
                ))}
            </div>
            <p className="card-text">{description}</p>
        </div>
    );
};

export default ReviewCardBody;