export class GenreChoice {
  constructor (description: string, value: boolean) {
    this.value = value
    this.description = description
  }

  value: boolean = false
  description: string = ''
}
