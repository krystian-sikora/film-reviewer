import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiService } from '../../core/services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  popular: any;
  actors: any;
  upcoming: any;
  topRatedTVSeries: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getPopular()
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.popular = res.results;
        })

    this.api.getActors()
      .pipe(take(1))
      .subscribe(
        (res) => {
          console.log(res.results)
          this.actors = res.results;
        })

    this.api.getUpcoming()
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.upcoming = res.results;
        })

    this.api.getTopRatedTVSeries()
    .pipe(take(1))
    .subscribe(
      (res) => {
        this.topRatedTVSeries = res.results;
      })

  } 
  
}
