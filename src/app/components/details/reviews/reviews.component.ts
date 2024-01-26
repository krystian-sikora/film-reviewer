/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Input, type OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment.development'
import { type Review } from '../../../interfaces/details/review/review'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AuthService } from '../../../core/services/auth/auth.service'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { type UserReview } from '../../../interfaces/details/review/user-review'
import { type Observable } from 'rxjs'

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
  constructor (private readonly http: HttpClient, protected auth: AuthService) { }

  @Input() id: number | undefined

  reviews: Review[] = []
  review!: Review
  reviewForm: FormGroup = new FormGroup({})
  loadReviewsError: boolean = false
  userReview!: UserReview
  authenticated: boolean = false

  ngOnInit (): void {
    this.getReviews()
    this.didUserReview()
    this.authenticated = this.auth.isAuthenticated()
    this.reviewForm = new FormGroup({
      score: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)]),
      content: new FormControl('', [Validators.required, Validators.maxLength(1024)]),
      title: new FormControl('', [Validators.required, Validators.maxLength(64)])
    })
  }

  submitReview (): void {
    if (!this.isFormValid()) return

    const review = {
      movie_id: this.id,
      score: Number(this.reviewForm.get('score')?.value),
      title: this.reviewForm.get('title')?.value,
      content: this.reviewForm.get('content')?.value
    }

    this.postReview(review)
  }

  isFormValid (): boolean {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched()
      return false
    }
    return true
  }

  isValid (input: string): boolean {
    if (((this.reviewForm.get(input)?.invalid) ?? false) &&
      ((this.reviewForm.get(input)?.errors) != null) &&
      (((this.reviewForm.get(input)?.dirty) ?? false) || ((this.reviewForm.get(input)?.touched) ?? false))) return false
    return true
  }

  isUserReviewed (review: Review): boolean {
    return review.account_id === this.userReview.review.account_id
  }

  getReviews (): void {
    this.getReviewsRequest().subscribe(
      {
        next: (response: Review[] | any) => {
          this.loadReviewsError = false
          this.reviews = response
          console.log(response)
        },
        error: (error: any) => {
          this.loadReviewsError = true
          console.log(error)
        },
        complete: () => {
          this.loadReviewsError = false
        }
      }
    )
  }

  postReview (review: any): void {
    this.postReviewRequest(review).subscribe(
      {
        error: (error: any) => {
          console.log(error)
        },
        complete: () => {
          this.getReviews()
          this.didUserReview()
          this.reviewForm.reset()
        }
      }
    )
  }

  deleteReview (): void {
    alert('Are you sure you want to delete your review?')
    this.deleteReviewRequest().subscribe(
      {
        error: (error: any) => {
          console.log(error)
        },
        complete: () => {
          this.getReviews()
          this.didUserReview()
        }
      }
    )
  }

  didUserReview (): void {
    this.didUserReviewRequest().subscribe(
      {
        next: (response: UserReview) => {
          console.log(response)

          if (response.user_reviewed) this.userReview = response
          else this.userReview.user_reviewed = false
        },
        error: (error: any) => {
          console.log(error)
        }
      }
    )
  }

  getReviewsRequest (): Observable<any> {
    return this.http.get(environment.LOCAL_API_URL + '/api/reviews/get/' + this.id)
  }

  didUserReviewRequest (): Observable<any> {
    return this.http.get(environment.LOCAL_API_URL + '/api/reviews/verify/' + this.id, { headers: this.auth.getHeaders() })
  }

  postReviewRequest (review: any): Observable<any> {
    const headers = this.auth.getHeaders()
    return this.http.post(environment.LOCAL_API_URL + '/api/reviews', review, { headers })
  }

  deleteReviewRequest (): Observable<any> {
    return this.http.delete(environment.LOCAL_API_URL + '/api/reviews/' + this.id, { headers: this.auth.getHeaders() })
  }

  numSequence (n: number): number[] {
    return Array(n)
  }
}
