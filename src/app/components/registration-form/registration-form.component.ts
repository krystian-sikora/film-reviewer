import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { SignUpDetails } from '../../classes/sign-up-details';
import { Genre } from '../../interfaces/genre';
import { GenreChoice } from '../../classes/genre-choice';
import { Genres } from '../../enums/genres';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule], 
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent implements OnInit {

  constructor(private http: HttpClient){ }

  protected signUpDetails: SignUpDetails = new SignUpDetails();
  protected signUpForm: FormGroup = new FormGroup({});
  protected genresList: Array<GenreChoice> = new Array<GenreChoice>();
  protected genres: Array<String> = Object.keys(Genres);

  ngOnInit(): void {

    console.log(this.genres)

    for(let genre in this.genres){
        this.genresList.push(new GenreChoice(this.genres[genre], false))

    }
  console.log(this.genresList)
  
    this.signUpForm = new FormGroup({

      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      city: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      street: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      houseNumber: new FormControl('', [Validators.pattern("^[1-9]\d*$")]),
      zipCode: new FormControl('', [Validators.pattern("^\d{2}-\d{3}$")]),
      description: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(9999)]),
      gender: new FormControl('', [Validators.required]),
      genres: new FormArray([])
    }
    );
  }

  signUp() {
    if (!this.isFormValid()) return;

    console.log(this.signUpDetails);
    this.signUpRequest().subscribe(
      {
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {      
          console.log(error.error);
        }
      }
    );
  }

  isFormValid() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return false;
    }
    return true;
  }

  signUpRequest() {
    return this.http.post(environment.LOCAL_API_URL + '/api/auth/authenticate', this.signUpDetails);
  }

  isValid(input: string) {
    if(this.signUpForm.get(input)?.invalid && 
      this.signUpForm.get(input)?.errors && 
      (this.signUpForm.get(input)?.dirty || this.signUpForm.get(input)?.touched)) return false;
    return true;
  }

  public checks: Array<GenreChoice> = [
    {description: 'Akcja', value: false},
    {description: "Dramat", value: false},
    {description: "Horror", value: false},
    {description: 'Komedia', value: false},
    {description: "Kryminał", value: false},
    {description: "Romans", value: false}
  ];
  
  onCheckChange(event:any) {
    const formArray: FormArray = this.signUpForm.get('genres') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
      console.log(formArray)
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          console.log(formArray)
          return;
        }
  
        i++;
      });
    }
  }

}
