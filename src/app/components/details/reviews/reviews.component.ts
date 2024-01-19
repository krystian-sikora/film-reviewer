import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Review } from '../../../interfaces/details/review/review';
import { AuthService } from '../../../core/services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserReview } from '../../../interfaces/details/review/user-review';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
  
  constructor(private http: HttpClient, protected auth: AuthService) { }

  @Input() 
  id: number | undefined;

  reviews: Array<Review> = [];
  review: Review = {} as Review;
  reviewForm: FormGroup = new FormGroup({});
  loadReviewsError: boolean = false;
  userReview: UserReview = {} as UserReview;
  authenticated: boolean = false;

  ngOnInit(): void {
    this.getReviews();
    this.didUserReview();
    this.authenticated = this.auth.isAuthenticated();
    this.reviewForm = new FormGroup({
      score: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)]),
      content: new FormControl('', [Validators.required, Validators.maxLength(1024)]),
      title: new FormControl('', [Validators.required, Validators.maxLength(64)])
    });
  }

  submitReview() {
    if (!this.isFormValid()) return;

    let review = {
      "movie_id": this.id,
      "score": Number(this.reviewForm.get('score')?.value),
      "title": this.reviewForm.get('title')?.value,
      "content": this.reviewForm.get('content')?.value,
    }

    console.log(review)

    this.postReview(review);
  }

  isFormValid() {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return false;
    }
    return true;
  }

  isValid(input: string) {
    if(this.reviewForm.get(input)?.invalid && 
      this.reviewForm.get(input)?.errors && 
      (this.reviewForm.get(input)?.dirty || this.reviewForm.get(input)?.touched)) return false;
    return true;
  }

  isUserReviewed(review: Review): boolean {
    return review.account_id == this.userReview.review.account_id
  }

  getReviews() {
    this.getReviewsRequest().subscribe(
      {
        next: (response: Array<Review> | any) => {
          this.loadReviewsError = false;
          this.reviews = response;
          console.log(response);
        },
        error: (error: any) => {
          this.loadReviewsError = true;
          console.log(error);
        },
        complete: () => {
          this.loadReviewsError = false;
        }
      }
    );
  }

  postReview(review: any) {
    this.postReviewRequest(review).subscribe(
      {
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.getReviews();
          this.didUserReview();
          this.reviewForm.reset();
        }
      }
    )
  }

  didUserReview() {

    this.didUserReviewRequest().subscribe(
      {
        next: (response: UserReview | any) => {
          console.log(response);

          if (response.user_reviewed) this.userReview = response;
          else this.userReview.user_reviewed = false;
          
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    )
  }

  getReviewsRequest() {
    return this.http.get(environment.LOCAL_API_URL + '/api/reviews/get/' + this.id);
  }

  didUserReviewRequest() {
    return this.http.get(environment.LOCAL_API_URL + '/api/reviews/verify/' + this.id, { headers: this.auth.getHeaders() });
  }

  postReviewRequest(review: any) {
    let headers = this.auth.getHeaders();
    return this.http.post(environment.LOCAL_API_URL + '/api/reviews/add', review, { headers: headers });
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
