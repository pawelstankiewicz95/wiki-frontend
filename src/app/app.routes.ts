import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { SolutionComponent } from './components/solution/solution.component';
import { CreateSolutionViewComponent } from './components/create-solution-view/create-solution-view.component';
import { EditSolutionComponent } from './components/edit-solution/edit-solution.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search-subject/:searchParam', component: SubjectListComponent },
    { path: 'program/:programId', component: CategoryListComponent },
    { path: 'program/:programId/category/:categoryId', component: SubjectListComponent },
    {
        path: 'search-subject/subject/:subjectId',
        component: SolutionComponent,
        children: [
            { path: 'new-solution', component: CreateSolutionViewComponent },
            { path: 'edit-solution/:solutionId', component: EditSolutionComponent },
        ]
    },
    {
        path: 'program/:programId/category/:categoryId/subject/:subjectId',
        component: SolutionComponent,
        children: [
            { path: 'new-solution', component: CreateSolutionViewComponent },
            { path: 'edit-solution/:solutionId', component: EditSolutionComponent },
        ]
    },
    { path: 'new-solution', component: CreateSolutionViewComponent },
    //{ path: 'search-subject/subject/:subjectId', component: SolutionComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: HomeComponent },

];
