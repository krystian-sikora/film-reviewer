import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInDetails } from '../../classes/auth/sign-in-details';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { LoginResponse } from '../../interfaces/auth/login-response';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  
  protected signInDetails: SignInDetails = new SignInDetails();
  protected signInForm: FormGroup = new FormGroup({});
  protected badCredentials: boolean = false;
  protected usernameNotFound: boolean = false;

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
    }
    );
  }

  signIn() {
    if (!this.isFormValid()) return;

    console.log(this.signInDetails);
    this.signInRequest().subscribe(
      {
        next: (response: LoginResponse | any) => {
          console.log(response);
          this.usernameNotFound = false;
          this.badCredentials = false;

          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          if (error.error == "USERNAME_NOT_FOUND") {
            this.usernameNotFound = true;
            this.badCredentials = false;
            return;
          }
          if (error.error == "BAD_CREDENTIALS") {
            this.usernameNotFound = false;
            this.badCredentials = true;
            return;
          }
        }
      }
    );
  }

  isFormValid() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return false;
    }
    return true;
  }

  signInRequest() {
    return this.http.post(environment.LOCAL_API_URL + '/api/auth/authenticate', this.signInDetails);
  }

  isValid(input: string) {
    if(this.signInForm.get(input)?.invalid && 
      this.signInForm.get(input)?.errors && 
      (this.signInForm.get(input)?.dirty || this.signInForm.get(input)?.touched)) return false;
    return true;
  }
}
