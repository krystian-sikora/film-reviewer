import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { DiscoverFormComponent } from './components/discover-form/discover-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { SearchResultsComponent } from './components/search-bar-component/search-results/search-results.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'prefix'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'movie/:id',
        component: DetailsComponent
    },
    {
        path: 'person/:id',
        component: DetailsComponent
    },
    {
        path: 'tv/:id',
        component: DetailsComponent
    },
    {
        path: 'discover',
        component: DiscoverFormComponent
    },
    {
        path: 'search',
        component: SearchResultsComponent
    },
    {
        path: 'register',
        component: RegistrationFormComponent
    },

    {
        path: 'login',
        component: LoginFormComponent
    },

    {
        path: 'contact',
        component: ContactFormComponent
    },
];
