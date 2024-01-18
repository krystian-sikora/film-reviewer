import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FilterData } from '../../classes/filter-data';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent implements OnInit {
router: any;
filterRequest: any;
filterForm: FormGroup = new FormGroup({});
filterData: FilterData = new FilterData();

filter() {
  console.log(this.filterData)
  }

ngOnInit(): void {
  this.filterForm = new FormGroup(
    {
      searchInput: new FormControl(''),
      genreAction: new FormControl(''),
      genreDrama: new FormControl(''),
      genreComedy: new FormControl(''),
      genreHorror: new FormControl(''),
      genreDocument: new FormControl(''),
      genreThriller: new FormControl(''),
      genreCrime: new FormControl(''),
      genreFantasy: new FormControl(''),
      genreRomance: new FormControl(''),
      genreSciFi: new FormControl(''),
      relaseDate: new FormControl(''),
    }
    );
  }
 
constructor(
  private http: HttpClient,
  ) { }


getFiltersRequest(isAdult: boolean) {
  return this.http.get("https://api.themoviedb.org/3/discover/movie?" + environment.API_KEY + "&include_adult=")

}
}

