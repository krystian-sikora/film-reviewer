import { Component, OnInit, resolveForwardRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDataService } from '../movie-data.service';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  popular: any;
  authorized: any;

  constructor(private movieDataService: MovieDataService) { }

  ngOnInit(): void {
    this.movieDataService.getPopular()
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.popular = res.results;
        })
  }
}
