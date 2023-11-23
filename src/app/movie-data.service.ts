import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  constructor(private http: HttpClient) { }

  readonly API_URL = 'https://api.themoviedb.org/3'
  readonly API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTdlYzRjNjEzN2IyMGYzM2NiNWM3MTEwNWE2ODY5OCIsInN1YiI6IjY1NWU1OGQ5ODNlZTY3MDFmNjI1NjYwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BOH44WFH-w8HVURt-6gP6RNzqEOedrESiE4AFiY5iFE'

  getHeaders() {
    return new HttpHeaders()
      .set('Authorization', this.API_TOKEN)
      .set('accept', 'application/json')
  }

  authorize() {
    let headers = this.getHeaders()
    return this.http.get(this.API_URL + '/authentication', { headers })
  }

  getPopular(): Observable<any> {
    let headers = this.getHeaders()
    return this.http.get(this.API_URL + '/movie/popular', { headers })
  }
}
