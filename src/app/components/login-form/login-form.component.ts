/* eslint-disable @typescript-eslint/unbound-method */
import { Component, type OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { SignInDetails } from '../../classes/auth/sign-in-details'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Router, RouterLink } from '@angular/router'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'
import { type LoginResponse } from '../../interfaces/auth/login-response'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AuthService } from '../../core/services/auth/auth.service'
import { type Observable } from 'rxjs'

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  constructor (private readonly http: HttpClient, private readonly router: Router, private readonly auth: AuthService) { }

  protected signInDetails: SignInDetails = new SignInDetails()
  protected signInForm: FormGroup = new FormGroup({})
  protected badCredentials: boolean = false
  protected usernameNotFound: boolean = false

  ngOnInit (): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)])
    }
    )
  }

  signIn (): void {
    if (!this.isFormValid()) return

    console.log(this.signInDetails)
    this.signInRequest().subscribe(
      {
        next: (response: LoginResponse) => {
          console.log(response)
          this.usernameNotFound = false
          this.badCredentials = false

          this.auth.logIn(response.access_token, response.refresh_token)
          this.router.navigate(['/']).catch(error => { console.log(error) })
        },
        error: (error: any) => {
          if (error.error === 'USERNAME_NOT_FOUND') {
            this.usernameNotFound = true
            this.badCredentials = false
            return
          }
          if (error.error === 'BAD_CREDENTIALS') {
            this.usernameNotFound = false
            this.badCredentials = true
          }
        }
      }
    )
  }

  isFormValid (): boolean {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched()
      return false
    }
    return true
  }

  signInRequest (): Observable<any> {
    return this.http.post(environment.LOCAL_API_URL + '/api/auth/authenticate', this.signInDetails)
  }

  isValid (input: string): boolean {
    if (((this.signInForm.get(input)?.invalid) ?? false) &&
      ((this.signInForm.get(input)?.errors) != null) &&
      (((this.signInForm.get(input)?.dirty) ?? false) || ((this.signInForm.get(input)?.touched) ?? false))) return false
    return true
  }
}
