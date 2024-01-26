// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, type OnInit } from '@angular/core'
import { type Observable } from 'rxjs'
import { type LoginResponse } from '../../../interfaces/auth/login-response'

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  protected isLoggedIn: boolean = false

  constructor (private readonly http: HttpClient) { }

  ngOnInit (): void {
    console.log('auth service init')
    this.handleAuth()
  }

  isAuthenticated (): boolean {
    return this.isLoggedIn
  }

  logIn (accesToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accesToken)
    localStorage.setItem('refresh_token', refreshToken)
    this.isLoggedIn = true
  }

  logOut (): void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    this.isLoggedIn = false
  }

  handleAuth (): void {
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')

    if (accessToken == null || refreshToken == null) return

    this.refreshToken(refreshToken)
  }

  refreshToken (token: string): void {
    this.refreshTokenRequest(token).subscribe(
      {
        next: (response: LoginResponse) => {
          localStorage.setItem('access_token', response.access_token)
          localStorage.setItem('refresh_token', response.refresh_token)
          this.isLoggedIn = true
        },
        error: () => {
          this.isLoggedIn = false
        },
        complete: () => {
          console.log('complete')
        }
      }
    )
  }

  refreshTokenRequest (token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)

    return this.http.post('http://localhost:8080/api/auth/refresh', null, { headers })
  }

  getHeaders (): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
  }
}
