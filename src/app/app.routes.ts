import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";
import { PeopleDetailsComponent } from './components/people-details/people-details.component';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';

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
        path: 'movies/:id',
        component: MovieDetailsComponent
    },
    {
        path: 'people/:id',
        component: PeopleDetailsComponent
    },
    {
        path: 'series/:id',
        component: SeriesDetailsComponent
    }
];
