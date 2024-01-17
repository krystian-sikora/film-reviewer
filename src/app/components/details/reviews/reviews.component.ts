import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Review } from '../../../interfaces/details/review';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
  
  constructor(private http: HttpClient) { }

  @Input() 
  id: number | undefined;
  reviews: Array<Review> = [];

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews() {
    this.getReviewsRequest().subscribe(
      {
        next: (response: Array<Review> | any) => {
          this.reviews = response;
          console.log(response);
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    );
  }

  getReviewsRequest() {
    return this.http.get(environment.LOCAL_API_URL + '/api/reviews/get/' + this.id);
  }
}
