import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { SolutionComponent } from './components/solution/solution.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'program/:programId', component: CategoryListComponent },
    { path: 'program/:programId/category/:categoryId', component: SubjectListComponent },
    { path: 'program/:programId/category/:categoryId/subject/:subjectId', component: SolutionComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: HomeComponent },

];
