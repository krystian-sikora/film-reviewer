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

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.handleAuth();
  }
}


