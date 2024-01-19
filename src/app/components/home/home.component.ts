import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiService } from '../../core/services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs';
import { RouterLink } from "@angular/router";
import { MovieDetails } from '../../interfaces/details/movie/movie-details';
import { PersonDetails } from '../../interfaces/details/people/person-details';
import { SearchBarComponentComponent } from '../search-bar-component/search-bar-component.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, NgOptimizedImage, SearchBarComponentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  popular: Array<MovieDetails> | undefined;
  people: Array<PersonDetails> | undefined;
  upcoming: Array<MovieDetails> | undefined;
  topRatedSeries: Array<MovieDetails> | undefined;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getPopular()
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.popular = res.results;
        })

    this.api.getPeople()
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.people = res.results;
        })

    this.api.getUpcoming()
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.upcoming = res.results;
        })

    this.api.getTopRatedSeries()
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.topRatedSeries = res.results;
        })

  }

}
