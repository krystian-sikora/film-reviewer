import { GenreChoice } from "./genre-choice";

export class SignUpDetails {

    name: String="";
    surname: String="";
    city: String="";
    street: String="";
    houseNumber: String="";
    zipCode: String="";
    description: String="";
    gender: String="";
    favouriteGenres: Array<GenreChoice> = new Array<GenreChoice>(); 

}
