import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  protected isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('auth service init')
    this.handleAuth();
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  logIn(accesToken: string, refreshToken: string) {
    localStorage.setItem('access_token', accesToken);
    localStorage.setItem('refresh_token', refreshToken);
    this.isLoggedIn = true;
  }

  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isLoggedIn = false;
  }

  handleAuth() {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (accessToken == null || refreshToken == null) return;
    
    this.refreshToken(refreshToken);
  }

  refreshToken(token: string) {
    this.refreshTokenRequest(token).subscribe(
      {
        next: (response: any) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          this.isLoggedIn = true;
        },
        error: (error: any) => {
          this.isLoggedIn = false;
        },
        complete: () => {
          console.log('complete')
        }
      }
    );
  }

  refreshTokenRequest(token: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)

    return this.http.post('http://localhost:8080/api/auth/refresh', null, { headers: headers });
  }

  getHeaders() {
    return new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
  }
}
