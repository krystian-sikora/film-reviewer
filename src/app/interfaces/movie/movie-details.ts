import { Genre } from "./genre";

export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    vote_avarage: number;
    genres: Array<Genre>;
}
