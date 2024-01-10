import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-new',
  standalone: false,
  templateUrl: './login-new.component.html',
  styleUrl: './login-new.component.scss'
})
export class LoginNewComponent {
 
  constructor(private router: Router) { }

  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return localStorage.getItem('access_token') ? true : false;
  }
}
