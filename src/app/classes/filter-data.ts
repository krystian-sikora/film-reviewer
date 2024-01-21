import { GenreChoice } from "./genre-choice";

export class FilterData {
    searchInput: String = "";
    genres: Array<GenreChoice> = new Array<GenreChoice>();
    relaseDate: String = '2000-01';
    sortBy: String = "popularity";
    sortOrder: String = "desc";
    includeAdult: Boolean = false;
}
