import { Genre } from "../genre";

export interface SeriesDetails {
    id: number;
    name: string;
    overview: string;
    first_air_date: string;
    last_air_date: string;
    poster_path: string;
    vote_avarage: number;
    genres: Array<Genre>;
}
