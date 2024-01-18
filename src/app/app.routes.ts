import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

export const routes: Routes = [  
{ path: 'home', component: HomeComponent },
{ path: '', component: HomeComponent },
{ path: '**', component: HomeComponent },
{ path: 'categories/:programId', component: CategoryListComponent },
];
