import React, { useRef, useState } from "react";
import SearchCard from "./SearchCard.tsx";
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
    const searchTerm = useRef<HTMLInputElement>(null);
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const search = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const term = searchTerm.current?.value;

        if (term) {
            const tvShowsRes = await searchTvShow(term);

            setTvShows(tvShowsRes);
            setShowPlaceholder(false);
        }
    };

    return (
        <>
            <form
                className="d-flex"
                onSubmit={search}
                style={{
                    paddingTop: "40px",
                    paddingRight: "150px",
                    paddingLeft: "150px",
                }}
            >
                <div className="input-group">
                    <input
                        type="text"
                        ref={searchTerm}
                        className="form-control"
                        placeholder="TV Show title..."
                        aria-label="TV Show title..."
                        aria-describedby="button-addon2"
                    />
                    <button className="btn btn-dark" type="submit" id="button-addon2">
                        Search
                    </button>
                </div>
            </form>

            <div className="text-center" style={{ paddingTop: "40px" }}>
                {showPlaceholder && (
                    <p className="h4">Please insert TV Show title for results</p>
                )}
            </div>

            <div
                className="row row-cols-1 row-cols-md-3 g-4 mw-100"
                style={{
                    paddingTop: "10px",
                    paddingRight: "50px",
                    paddingLeft: "50px",
                }}
            >
                {tvShows.map((tvShow, index) => (
                    <SearchCard key={index} {...tvShow} />
                ))}
            </div>
        </>
    );
};

export default Search;