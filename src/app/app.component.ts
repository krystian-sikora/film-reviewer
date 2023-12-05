import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { register } from 'swiper/element/bundle';
import { AuthComponent } from "./api/auth/auth.component";
import { NavbarComponent } from "./navbar/navbar.component";

register();

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, HttpClientModule, NavbarComponent]
})
export class AppComponent {
  title = 'film-reviewer';
}
