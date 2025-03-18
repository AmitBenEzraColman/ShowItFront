// Search.tsx
import React, { useState } from "react";
import SearchCard from "./SearchCard";
import { searchTvShow } from "../../services/tv-show-service";

interface TvShow {
    backdrop_path: string;
    id: number;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
}

const Search: React.FC = () => {
    const [tvShows, setTvShows] = useState<TvShow[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const search = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchTerm) {
            const tvShowsRes = await searchTvShow(searchTerm);
            setTvShows(tvShowsRes);
            setShowPlaceholder(false);
        }
    };

    return (
        <div className="container py-5">
            <form onSubmit={search} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search TV Show..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-primary btn-lg" type="submit">
                        <i className="bi bi-search"></i> Search
                    </button>
                </div>
            </form>

            {showPlaceholder && (
                <p className="text-center fs-4 text-muted mb-4">
                    Enter a TV Show title to see results
                </p>
            )}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {tvShows.map((tvShow, index) => (
                    <div className="col" key={index}>
                        <SearchCard {...tvShow} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;