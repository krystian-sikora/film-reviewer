import { Component, type OnInit } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { SearchBarComponentComponent } from '../search-bar-component.component'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment.development'
import { type MovieDetails } from '../../../interfaces/details/movie/movie-details'
import { RouterLink } from '@angular/router'
import { type Observable } from 'rxjs'

@Component({
  selector: 'app-search-results',
  standalone: true,
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  imports: [CommonModule, SearchBarComponentComponent, NgOptimizedImage, RouterLink]
})
export class SearchResultsComponent implements OnInit {
  protected query: string = ''
  protected searchResults: MovieDetails[] = []

  constructor (private readonly http: HttpClient) { }

  ngOnInit (): void {
    this.reloadSearch()
  }

  reloadSearch (): void {
    this.query = window.location.search.split('=')[1]
    this.search()
  }

  search (): void {
    this.getSearchRequest().subscribe(
      {
        next: (response: any) => {
          this.searchResults = response.results
        },
        error: (error: any) => {
          console.log(error)
        }
      }
    )
  }

  getSearchRequest (): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?query=${this.query}&api_key=${environment.API_KEY}`)
  }
}
