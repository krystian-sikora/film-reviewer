import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-new',
  standalone: false,
  templateUrl: './login-new.component.html',
  styleUrl: './login-new.component.scss'
})
export class LoginNewComponent {
  protected loggedIn: boolean = false;
 
  constructor(private router: Router, protected auth: AuthService) { }

  logOut() {
    this.auth.logOut();
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return this.auth.isLoggedIn;
  }
}
