import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

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
        path: 'search',
        component: SearchFormComponent
    },
];
