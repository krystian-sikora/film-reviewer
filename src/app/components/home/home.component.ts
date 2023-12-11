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

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getPopular()
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.popular = res.results;
        })
  }
}
