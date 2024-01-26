import { Component, type OnInit } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { environment } from '../../../environments/environment'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient } from '@angular/common/http'
import { FormArray, FormControl, FormGroup, FormsModule, type NgForm } from '@angular/forms'
import { FilterData } from '../../classes/filter-data'
import { Genres } from '../../enums/genres'
import { GenreChoice } from '../../classes/genre-choice'
import { GenreWithIds } from '../../enums/genre-with-ids'
import { type MovieDetails } from '../../interfaces/details/movie/movie-details'
import { RouterLink } from '@angular/router'
import { type Observable } from 'rxjs'

@Component({
  selector: 'app-discover-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage, RouterLink],
  templateUrl: './discover-form.component.html',
  styleUrl: './discover-form.component.scss'
})
export class DiscoverFormComponent implements OnInit {
  protected filterRequest: any
  protected filterForm: FormGroup = new FormGroup({})
  protected filterData: FilterData = new FilterData()
  protected genres: string[] = Object.keys(Genres)
  protected genresList: GenreChoice[] = new Array<GenreChoice>()
  protected movieList: MovieDetails[] = new Array<MovieDetails>()

  constructor (private readonly http: HttpClient) { }

  ngOnInit (): void {
    for (let i = 0; i < this.genres.length; i++) {
      this.genresList.push(new GenreChoice(this.genres[i], false))
      this.filterData.genres.push(new GenreChoice(this.genres[i], false))
    }

    this.filterForm = new FormGroup(
      {
        searchInput: new FormControl(''),
        genres: new FormArray([]),
        relaseDate: new FormControl(''),
        sortBy: new FormControl(''),
        sortOrder: new FormControl('')
      }
    )
  }

  filter (f: NgForm): void {
    console.log(this.filterData)
    console.log(this.generateParams())

    this.getFiltersRequest().subscribe(
      {
        next: (response: any) => {
          this.movieList = response.results
          console.log(response)
        },
        error: (error: any) => {
          console.log(error)
        }
      }
    )
  }

  getGenreId (genreName: string): string {
    for (const genre in GenreWithIds) {
      if (genreName === genre) {
        return GenreWithIds[genre]
      }
    }

    return ''
  }

  getFiltersRequest (): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?${this.generateParams()}&api_key=${environment.API_KEY}`)
  }

  generateParams (): string {
    const data: Record<string, any> = {
      with_genres: this.filterData.genres.filter(genre => genre.value).map(genre => this.getGenreId(genre.description)).join(','),
      include_adult: this.filterData.includeAdult,
      sort_by: this.filterData.sortBy !== '' ? `${this.filterData.sortBy}.${this.filterData.sortOrder}` : '',
      'primary_release_date.gte': this.filterData.relaseDate + '-01'
    }

    console.log(data)

    for (const key in data) {
      if (data[key] === '') {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete data[key]
      }
    }

    return new URLSearchParams(data).toString()
  }

  onCheckChange (event: any): void {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (event.target.checked) {
      for (let i = 0; i < this.filterData.genres.length; i++) {
        if (this.filterData.genres[i].description === event.target.value) {
          this.filterData.genres[i].value = true
          return
        }
      }
    }

    for (let i = 0; i < this.filterData.genres.length; i++) {
      if (this.filterData.genres[i].description === event.target.value) {
        this.filterData.genres[i].value = false
        return
      }
    }
  }
}
