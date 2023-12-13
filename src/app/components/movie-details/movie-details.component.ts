import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../core/services/api/api.service";
import { MovieDetails } from '../../interfaces/movie/movie-details';
import { take } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})

export class MovieDetailsComponent implements OnInit {
  id: string | undefined;
  movieDetails: MovieDetails | undefined;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.getMovieDetails()
  }

  private getMovieDetails() {
    this.api.getMovieDetails(this.getMovieId())
      .pipe(take(1))
      .subscribe((res) => {
        this.movieDetails = res;
      });
  }

  private getMovieId(): string {
    return this.route.snapshot.paramMap.get('id')!;
  }
}
