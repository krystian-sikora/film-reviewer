import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments.development';
import { TvDetails } from '../../../interfaces/tv/tv-details';
import { MovieDetails } from '../../../interfaces/movie/movie-details';
import { PersonDetails } from '../../../interfaces/people/person-details';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) { }

  private headers: HttpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + environment.API_TOKEN)
    .set('accept', 'application/json')

  authenticate(token: string): Observable<any> {
    return this.http.get(environment.API_URL + '/3/authenticate/' + token, { headers: this.headers })
  }

  account(): Observable<any> {
    return this.http.get(environment.API_URL + '/3/account/1?api_key=' + environment.API_KEY + '&session_id=' + localStorage.getItem('session_id'), { headers: this.headers })
  }

  getPopular(): Observable<any> {
    return this.http.get(environment.API_URL + '/3/movie/popular', { headers: this.headers })
  }

  requestToken(): Observable<any> {
    return this.http.get(environment.API_URL +  '/3/authentication/token/new',  { headers: this.headers })
  }

  getImage(id: string): Observable<any> {
    return this.http.get(environment.API_URL + '/3/movie/' + id + '/images',  { headers: this.headers })
  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(environment.API_URL + '/3/movie/' + id,  { headers: this.headers })
  }
  
  getTvDetails(id: string): Observable<TvDetails> {
    return this.http.get<TvDetails>(environment.API_URL + '/3/tv/' + id,  { headers: this.headers })
  }
  
  getPersonDetails(id: string): Observable<PersonDetails> {
    return this.http.get<PersonDetails>(environment.API_URL + '/3/person/' + id,  { headers: this.headers })
  }

  createSession(REQUEST_TOKEN: string): Observable<any> {
    return this.http.get(environment.API_URL +  '/3/authentication/session/new?api_key=' + environment.API_KEY + '&request_token=' + REQUEST_TOKEN)
  }

  getPeople(): Observable<any> {
    return this.http.get(environment.API_URL + '/3/trending/person/day', { headers: this.headers })
  }

  getUpcoming(): Observable<any> {
    return this.http.get(environment.API_URL + '/3/movie/upcoming', { headers: this.headers })
  }

  getTopRatedSeries(): Observable<any> {
    return this.http.get(environment.API_URL + '/3/tv/top_rated', { headers: this.headers })
  }
}
