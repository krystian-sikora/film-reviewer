import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { register } from 'swiper/element/bundle';
import { CoreModule } from './core/core.module';
import { AuthService } from './core/services/auth/auth.service';


register();

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, HttpClientModule, CoreModule]
})
export class AppComponent implements OnInit {
  title = 'film-reviewer';
  private request_token: any = false;

  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.handleQuery();
  }

  // todo: find a better name for this function
  private handleQuery() {
    this.route.queryParams
      .subscribe(
        (res) => {
          this.request_token = res['request_token'];

          if (this.request_token) this.auth.newSession(this.request_token);
          else this.auth.validateUser();
        }
      );
  }
}


