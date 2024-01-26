/* eslint-disable @typescript-eslint/unbound-method */
import { Component, type OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Router, RouterLink } from '@angular/router'
import { environment } from '../../../environments/environment.development'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient } from '@angular/common/http'
import { SignUpDetails } from '../../classes/sign-up-details'
import { GenreChoice } from '../../classes/genre-choice'
import { Genres } from '../../enums/genres'
import { type LoginResponse } from '../../interfaces/auth/login-response'
import { type Observable } from 'rxjs'

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent implements OnInit {
  constructor (private readonly http: HttpClient, private readonly router: Router) { }

  protected signUpDetails: SignUpDetails = new SignUpDetails()
  protected signUpForm: FormGroup = new FormGroup({})
  protected genresList: GenreChoice[] = new Array<GenreChoice>()
  protected genres: string[] = Object.keys(Genres)
  protected userNameAlreadyExist: boolean = false
  protected emailAlreadyExist: boolean = false
  protected registerRequest: any

  ngOnInit (): void {
    for (let i = 0; i < this.genres.length; i++) {
      this.genresList.push(new GenreChoice(this.genres[i], false))
      this.signUpDetails.favouriteGenres.push(new GenreChoice(this.genres[i], false))
    }

    this.signUpForm = new FormGroup({

      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(99)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(99)]),
      userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      city: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(99)]),
      street: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(99)]),
      houseNumber: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required, Validators.pattern('^\\d{2}-\\d{3}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
      description: new FormControl('', [Validators.minLength(1), Validators.maxLength(9999)]),
      gender: new FormControl('', [Validators.required]),
      genres: new FormArray([])
    }
    )
  }

  signUp (): void {
    if (!this.isFormValid()) return

    this.registerRequest = {
      email: this.signUpDetails.email,
      password: this.signUpDetails.password,
      username: this.signUpDetails.userName
    }

    this.signUpRequest().subscribe(
      {
        next: (response: LoginResponse) => {
          this.userNameAlreadyExist = false
          this.emailAlreadyExist = false

          localStorage.setItem('access_token', response.access_token)
          localStorage.setItem('refresh_token', response.refresh_token)
        },
        error: (error: any) => {
          if (error.error === 'USERNAME ALREADY EXISTS') {
            this.userNameAlreadyExist = true
          } else {
            this.userNameAlreadyExist = false
          }
          if (error.error === 'EMAIL ADDRESS ALREADY EXISTS') {
            this.emailAlreadyExist = true
          } else {
            this.emailAlreadyExist = false
          }
        },
        complete: () => {
          this.router.navigate(['/']).catch(error => { console.log(error) })
        }
      }
    )
  }

  isFormValid (): boolean {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched()
      return false
    }
    return true
  }

  signUpRequest (): Observable<any> {
    return this.http.post(environment.LOCAL_API_URL + '/api/auth/register', this.registerRequest)
  }

  isValid (input: string): boolean {
    if (((this.signUpForm.get(input)?.invalid) ?? false) &&
      ((this.signUpForm.get(input)?.errors) != null) &&
      (((this.signUpForm.get(input)?.dirty) ?? false) || ((this.signUpForm.get(input)?.touched) ?? false))) return false
    return true
  }

  onCheckChange (event: any): void {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (event.target.checked) {
      for (let i = 0; i < this.signUpDetails.favouriteGenres.length; i++) {
        if (this.signUpDetails.favouriteGenres[i].description === event.target.value) {
          this.signUpDetails.favouriteGenres[i].value = true
          return
        }
      }
    }

    for (let i = 0; i < this.signUpDetails.favouriteGenres.length; i++) {
      if (this.signUpDetails.favouriteGenres[i].description === event.target.value) {
        this.signUpDetails.favouriteGenres[i].value = false
        return
      }
    }
  }
}
