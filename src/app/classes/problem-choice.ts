export class ProblemChoice {
  constructor (description: string, value: boolean) {
    this.value = value
    this.description = description
  }

  value: boolean = false
  description: string = ''
}
