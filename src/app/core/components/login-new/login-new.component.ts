import { Component } from '@angular/core'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Router } from '@angular/router'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-login-new',
  standalone: false,
  templateUrl: './login-new.component.html',
  styleUrl: './login-new.component.scss'
})
export class LoginNewComponent {
  protected loggedIn: boolean = false

  constructor (private readonly router: Router, protected auth: AuthService) { }

  logOut (): void {
    this.auth.logOut()
    this.router.navigate(['/']).catch(error => { console.log(error) })
  }

  isLoggedIn (): boolean {
    return this.auth.isAuthenticated()
  }
}
