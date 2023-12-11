import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { take } from 'rxjs/internal/operators/take';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  REQUEST_TOKEN!: string;
  loggedIn: boolean = false;

  constructor(private api: ApiService, private router: Router) { }

  isLoggedIn() {
    return this.loggedIn
  }

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  logIn() {
    this.api.requestToken()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.REQUEST_TOKEN = res.request_token
          window.location.href = 'https://www.themoviedb.org/authenticate/'+ this.REQUEST_TOKEN + '?redirect_to=' + window.origin
        },
        error: err => console.error('Observable emitted an error: ' + err)
      })
  }

  newSession(REQUEST_TOKEN: string) {
    this.api.createSession(REQUEST_TOKEN)
      .subscribe(
        (res) => {
          this.router.navigate([''])
          localStorage.setItem('session_id', res.session_id);
          this.validateUser()
        }
      )  
  }

  validateUser() {
    if (!localStorage.getItem('session_id')) return;
    this.setLoggedIn(true)

    // todo: validate user in tmdb
  }
}
