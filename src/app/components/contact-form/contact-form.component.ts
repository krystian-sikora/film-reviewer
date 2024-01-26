/* eslint-disable @typescript-eslint/unbound-method */
import { Component, type OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Router, RouterLink } from '@angular/router'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient } from '@angular/common/http'
import { ProblemChoice } from '../../classes/problem-choice'
import { Problems } from '../../enums/problems'
import { ContactDetails } from '../../classes/contact-details'

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  constructor (private readonly http: HttpClient, private readonly router: Router) { }

  protected contactDetails: ContactDetails = new ContactDetails()
  protected contactForm: FormGroup = new FormGroup({})
  protected problemList: ProblemChoice[] = new Array<ProblemChoice>()
  protected problems: string[] = Object.keys(Problems)
  protected usernameNotFound: boolean = false
  protected badCredentials: boolean = false

  ngOnInit (): void {
    for (let i = 0; i < this.problems.length; i++) {
      this.problemList.push(new ProblemChoice(this.problems[i], false))
      this.contactDetails.problemType.push(new ProblemChoice(this.problems[i], false))
    }

    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(99)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(99)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.min(100000000), Validators.max(999999999)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      description: new FormControl('', [Validators.minLength(1), Validators.maxLength(9999)]),
      gender: new FormControl('', [Validators.required]),
      problemType: new FormArray([])
    })
  }

  contactUs (): void {
    if (!this.isFormValid()) return

    console.log(this.contactDetails)
    this.contactForm.reset()
  }

  isFormValid (): boolean {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched()
      return false
    }
    return true
  }

  isValid (input: string): boolean {
    if (((this.contactForm.get(input)?.invalid) ?? false) &&
      ((this.contactForm.get(input)?.errors) != null) &&
      (((this.contactForm.get(input)?.dirty) ?? false) || ((this.contactForm.get(input)?.touched) ?? false))) return false
    return true
  }

  onCheckChange (event: any): void {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (event.target.checked) {
      for (let i = 0; i < this.contactDetails.problemType.length; i++) {
        if (this.contactDetails.problemType[i].description === event.target.value) {
          this.contactDetails.problemType[i].value = true
          return
        }
      }
    }

    for (let i = 0; i < this.contactDetails.problemType.length; i++) {
      if (this.contactDetails.problemType[i].description === event.target.value) {
        this.contactDetails.problemType[i].value = false
        return
      }
    }
  }
}
