import { MovieDetails } from "../movie/movie-details";

export interface PersonDetails {
    id: number;
    name: string;
    known_for: Array<MovieDetails>
    profile_path: string;
    popularity: number;
    biography: string;
}
