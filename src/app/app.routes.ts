import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';

export const routes: Routes = [  
{ path: 'home', component: HomeComponent },
{ path: 'program/:programId', component: CategoryListComponent },
{ path: 'category/:categoryId', component: SubjectListComponent },
{ path: '', component: HomeComponent },
{ path: '**', component: HomeComponent },

];
