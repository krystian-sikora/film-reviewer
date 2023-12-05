import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  constructor(private api: ApiService) { } 

  private REQUEST_TOKEN!: string;
  private session_id!: string;

  isLoggedIn: boolean = false;

  logIn() {
    this.api.requestToken().pipe(take(1)).subscribe(
      (res) => {
        this.REQUEST_TOKEN = res.request_token
        // console.log(res)
        // console.log(this.REQUEST_TOKEN)
        window.open('https://www.themoviedb.org/authenticate/'+ this.REQUEST_TOKEN)
      }
    )
  }

  createSession() {
    this.api.createSession(this.REQUEST_TOKEN).subscribe(
      (res) => {
        console.log(res);
        this.isLoggedIn = res.success;
        this.session_id = res.session_id;
      }
    )
  }
}
