import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from "../api/auth/auth.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [CommonModule, AuthComponent, RouterLink]
})
export class NavbarComponent {

}
