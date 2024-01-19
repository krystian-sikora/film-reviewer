import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { LoginNewComponent } from './components/login-new/login-new.component';

@NgModule({
    declarations: [NavbarComponent, LoginNewComponent],
    exports: [NavbarComponent, LoginNewComponent],
    imports: [
        CommonModule,
        RouterLink,
    ]
})
export class CoreModule { }
