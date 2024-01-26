import { type ProblemChoice } from './problem-choice'

export class ContactDetails {
  name: string = ''
  surname: string = ''
  phoneNumber: string = ''
  email: string = ''
  description: string = ''
  gender: string = ''
  problemType: ProblemChoice[] = new Array<ProblemChoice>()
}
