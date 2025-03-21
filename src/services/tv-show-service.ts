import apiClient from "./api-client";

export interface TvShow {
    backdrop_path: string;
    id: number;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
}

export const searchTvShow = (searchTerm: string) => {
    return new Promise<TvShow[]>((resolve, reject) => {
        apiClient
            .get(`/tvshows/search/${searchTerm}`)
            .then((response) => {
                const tvshows = (response.data as TvShow[])
                    .filter((tvShow: TvShow) => tvShow.popularity > 1)
                    .sort((a, b) => b.popularity - a.popularity);
                console.log(tvshows)
                resolve(tvshows);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getTvShowById = (tvShowId: number) => {
    return new Promise<TvShow>((resolve, reject) => {
        apiClient
            .get(`/tvshows/${tvShowId}`)
            .then((response) => {
                resolve(response.data as TvShow);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getSuggestionsByTitle = (title: string) => {
    const encodedTitle = encodeURIComponent(title);
    return new Promise<string>((resolve, reject) => {
        apiClient
            .get(`/gemini?tvShowTitle=${encodedTitle}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};