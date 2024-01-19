import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProblemChoice } from '../../classes/problem-choice';
import { Problems } from '../../enums/problems';
import { ContactDetails } from '../../classes/contact-details';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule], 
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router){ }

  protected contactDetails: ContactDetails = new ContactDetails();
  protected contactForm: FormGroup = new FormGroup({});
  protected problemList: Array<ProblemChoice> = new Array<ProblemChoice>();
  protected problems: Array<String> = Object.keys(Problems);
  protected usernameNotFound: boolean = false;
  protected badCredentials: boolean = false;

  ngOnInit(): void {
    for(let problem in this.problems){
      this.problemList.push(new ProblemChoice(this.problems[problem], false))
      this.contactDetails.problemType.push(new ProblemChoice(this.problems[problem], false))
  }

    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(99)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(99)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.min(100000000), Validators.max(999999999)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      description: new FormControl('', [Validators.minLength(1), Validators.maxLength(9999)]),
      gender: new FormControl('', [Validators.required]),
      problemType: new FormArray([])
    });
  }

  contactUs() {
    if (!this.isFormValid()) return;

    console.log(this.contactDetails);
    this.contactForm.reset();
  }

  isFormValid() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return false;
    }
    return true;
  }

  isValid(input: string) {
    if (this.contactForm.get(input)?.invalid && 
      this.contactForm.get(input)?.errors && 
      (this.contactForm.get(input)?.dirty || this.contactForm.get(input)?.touched)) return false;
    return true;
  }

  onCheckChange(event:any): void {
    if (event.target.checked) {
      for (let i = 0; i < this.contactDetails.problemType.length; i++) {
        if (this.contactDetails.problemType[i].description == event.target.value) {
          this.contactDetails.problemType[i].value = true;
          return;
        }
      }
    }

    for (let i = 0; i < this.contactDetails.problemType.length; i++) {
      if (this.contactDetails.problemType[i].description == event.target.value) {
        this.contactDetails.problemType[i].value = false;
        return;
      }
    }
  }

}
