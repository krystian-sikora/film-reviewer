import { Component, type OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ApiService } from '../../core/services/api/api.service'
import { HttpClientModule } from '@angular/common/http'
import { RouterLink } from '@angular/router'
import { type MovieDetails } from '../../interfaces/details/movie/movie-details'
import { type PersonDetails } from '../../interfaces/details/people/person-details'
import { SearchBarComponentComponent } from '../search-bar-component/search-bar-component.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, NgOptimizedImage, SearchBarComponentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  popular: MovieDetails[] | undefined
  people: PersonDetails[] | undefined
  upcoming: MovieDetails[] | undefined
  topRatedSeries: MovieDetails[] | undefined

  constructor (private readonly api: ApiService) { }

  ngOnInit (): void {
    this.loadData()
  }

  loadData (): void {
    this.api.getPopular()
      .subscribe(
        (res) => {
          this.popular = res.results
        })

    this.api.getPeople()
      .subscribe(
        (res) => {
          this.people = res.results
        })

    this.api.getUpcoming()
      .subscribe(
        (res) => {
          this.upcoming = res.results
        })

    this.api.getTopRatedSeries()
      .subscribe(
        (res) => {
          this.topRatedSeries = res.results
        })
  }
}
