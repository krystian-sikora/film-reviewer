import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { MovieDataService } from "../movie-data.service";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})

export class MovieDetailsComponent implements OnInit {
  id: string | undefined;
  movieDetails: any;

  constructor(private route: ActivatedRoute, private movieDataService: MovieDataService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!
    return this.movieDataService.getMovieDetails(this.id!)
      .subscribe((res) => this.movieDetails = res)
  }
}
