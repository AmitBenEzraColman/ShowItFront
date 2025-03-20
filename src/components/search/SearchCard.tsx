// SearchCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface SearchCardProps {
    id: number;
    original_name: string;
    poster_path: string;
    overview: string;
}

const SearchCard: React.FC<SearchCardProps> = ({
                                                   id,
                                                   original_name,
                                                   poster_path,
                                                   overview,
                                               }) => {
    const navigate = useNavigate();
    const handleAddReview = () => {
        console.log("Add review for TV Show:", id);
        navigate(`/addReview/${id}`);
    };

    return (
        <div className="card h-100 shadow-sm">
            <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                className="card-img-top"
                alt={original_name}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{original_name}</h5>
                <p className="card-text flex-grow-1">{overview}</p>
                <button
                    className="btn btn-primary mt-auto"
                    onClick={handleAddReview}
                >
                    Write a review
                </button>
            </div>
        </div>
    );
};

export default SearchCard;