import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from "./components/login/login.component";
import { RouterLink } from '@angular/router';

@NgModule({
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
    imports: [
        CommonModule,
        RouterLink,
        LoginComponent
    ]
})
export class CoreModule { }
