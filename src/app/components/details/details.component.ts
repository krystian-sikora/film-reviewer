import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Details } from '../../interfaces/details/details';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api/api.service';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  details: Details | undefined;
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    let type = this.route.snapshot.url[0].path
    let id = this.route.snapshot.paramMap.get('id')!

    this.getDetails(type, id);
  }
  
  getDetails(type: string, id: string): void {
    switch(type) {
      case('movie'): {
        this.getMovieDetails(id);
        break;
      }
      case('person'): {
        this.getPersonDetails(id);
        break;
      }
      case('tv'): {
        this.getTvDetails(id);
        break;
      }
    }
  }

  getMovieDetails(id: string) {
    this.api.getMovieDetails(id).subscribe(
      (res) => {
        this.details = {
          ...res,
          id: res.id,
          name: res.title,
          description: res.overview,
          img_path: res.poster_path
        } as Details
      }
    )
  }

  getPersonDetails(id: string) {
    this.api.getPersonDetails(id).subscribe(
      (res) => {
        this.details = {
          ...res,
          id: res.id,
          name: res.name,
          description: res.biography,
          img_path: res.profile_path
        } as Details;
      }
    )
  }

  getTvDetails(id: string) {
    this.api.getTvDetails(id).subscribe(
      (res) => {
        this.details = {
          ...res,
          id: res.id,
          name: res.name,
          description: res.overview,
          img_path: res.poster_path
        } as Details;
      }
    )
  }
}


