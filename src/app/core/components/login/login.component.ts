import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  account: any;

  constructor(private auth: AuthService, private api: ApiService) {
    this.getAccountData()
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logIn() {
    this.auth.logIn();
  }

  logOut() {
    this.auth.setLoggedIn(false);
    localStorage.removeItem('session_id');
  }

  getAccountData() {
    this.api.account().subscribe(
        (res) => {
            console.log(res)
            this.account = res;
        }
    )
}

  // createSession() {
  //   this.auth.createSession()
  // }
}
