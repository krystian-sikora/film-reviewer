import { type GenreChoice } from './genre-choice'

export class SignUpDetails {
  name: string = ''
  surname: string = ''
  city: string = ''
  street: string = ''
  houseNumber: string = ''
  zipCode: string = ''
  description: string = ''
  gender: string = ''
  favouriteGenres: GenreChoice[] = new Array<GenreChoice>()
  password: string = ''
  email: string = ''
  userName: string = ''
}
