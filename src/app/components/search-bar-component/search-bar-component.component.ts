import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Router, RouterLink } from '@angular/router'
import { FormsModule, type NgForm } from '@angular/forms'

@Component({
  selector: 'app-search-bar-component',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './search-bar-component.component.html',
  styleUrl: './search-bar-component.component.scss'
})
export class SearchBarComponentComponent {
  protected query: string = ''

  constructor (private readonly router: Router) { }

  submit (f: NgForm): void {
    console.log(this.query)
    this.router.navigate(['/search'], { queryParams: { query: this.query } }).catch(error => { console.log(error) })
  }
}
