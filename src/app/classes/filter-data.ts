import { type GenreChoice } from './genre-choice'

export class FilterData {
  searchInput: string = ''
  genres: GenreChoice[] = new Array<GenreChoice>()
  relaseDate: string = '2000-01'
  sortBy: string = 'popularity'
  sortOrder: string = 'desc'
  includeAdult: boolean = false
}
