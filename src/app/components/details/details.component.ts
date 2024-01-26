import { Component, type OnInit } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { type Details } from '../../interfaces/details/details'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ActivatedRoute } from '@angular/router'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ApiService } from '../../core/services/api/api.service'
import { ReviewsComponent } from './reviews/reviews.component'

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  imports: [CommonModule, NgOptimizedImage, ReviewsComponent]
})
export class DetailsComponent implements OnInit {
  details: Details | undefined
  constructor (private readonly route: ActivatedRoute, private readonly api: ApiService) {}

  ngOnInit (): void {
    const type = this.route.snapshot.url[0].path
    const id = this.route.snapshot.paramMap.get('id')

    if (id == null) throw new Error('No id provided')
    this.getDetails(type, id)
  }

  getDetails (type: string, id: string): void {
    switch (type) {
      case ('movie'): {
        this.getMovieDetails(id)
        break
      }
      case ('person'): {
        this.getPersonDetails(id)
        break
      }
      case ('tv'): {
        this.getTvDetails(id)
        break
      }
    }
  }

  getMovieDetails (id: string): void {
    this.api.getMovieDetails(id).subscribe(
      (res) => {
        this.details = {
          ...res,
          id: res.id,
          name: res.title,
          description: res.overview,
          img_path: res.poster_path
        } satisfies Details
        console.log(this.details)
      }
    )
  }

  getPersonDetails (id: string): void {
    this.api.getPersonDetails(id).subscribe(
      (res) => {
        this.details = {
          ...res,
          id: res.id,
          name: res.name,
          description: res.biography,
          img_path: res.profile_path,
          vote_average: 0,
          release_date: ''
        } satisfies Details
      }
    )
  }

  getTvDetails (id: string): void {
    this.api.getTvDetails(id).subscribe(
      (res) => {
        this.details = {
          ...res,
          id: res.id,
          name: res.name,
          description: res.overview,
          img_path: res.poster_path,
          release_date: res.first_air_date
        } satisfies Details
      }
    )
  }
}
