import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';
import { AccountDetails } from '../../../interfaces/account/account-details';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  account: AccountDetails | undefined;

  constructor(private auth: AuthService, private api: ApiService) {
    this.getAccountData()
  }

  getAccountData() {
    this.api.account().subscribe(
        (res) => {
            this.account = res;
        })
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logIn() {
    this.auth.logIn();
  }

  logOut() {
    this.auth.setLoggedIn(false);
    localStorage.removeItem('session_id');
  }
}
