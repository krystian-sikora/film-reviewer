import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  constructor(private http: HttpClient) { }

  readonly API_URL = 'https://api.themoviedb.org/3'
  readonly API_TOKEN = 'token :)'

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
