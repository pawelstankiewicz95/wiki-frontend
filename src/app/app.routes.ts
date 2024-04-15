import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { SubjectListComponent } from './components/subjects/subject-list/subject-list.component';
import { SolutionComponent } from './components/solutions/solution-list/solution-list.component';
import { CreateSolutionViewComponent } from './components/solutions/create-solution-view/create-solution-view.component';
import { EditSolutionComponent } from './components/solutions/edit-solution/edit-solution.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guard/auth-guard.guard';
import { CreateSubjectComponent } from './components/subjects/create-subject/create-subject.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { CreateAnnouncementComponent } from './components/announcements/create-announcement/create-announcement.component';
import { RegisterComponent } from './components/register/register.component';
export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'search-subject/:searchParam', component: SubjectListComponent, canActivate: [authGuard] },
    { path: 'program/:programId', component: CategoryListComponent, canActivate: [authGuard] },
    {
        path: 'program/:programId/category/:categoryId', component: SubjectListComponent, canActivate: [authGuard],
        children: [
            { path: 'new-subject', component: CreateSubjectComponent },
        ]
    },
    { path: 'program/:programId/category/:categoryId/subject/:subjectId/edit-solution', component: EditSolutionComponent, canActivate: [authGuard] },
    {
        path: 'search-subject/subject/:subjectId',
        component: SolutionComponent, canActivateChild: [authGuard],
        children: [
            { path: 'new-solution', component: CreateSolutionViewComponent },
            { path: 'edit-solution/:solutionId', component: EditSolutionComponent },
        ]
    },
    {
        path: 'program/:programId/category/:categoryId/subject/:subjectId',
        component: SolutionComponent, canActivateChild: [authGuard],
        children: [
            { path: 'new-solution', component: CreateSolutionViewComponent },
        ]
    },
    { path: 'admin-dashboard', component: AdminDashboardComponent,
    children: [
        { path: 'user-list', component: UserListComponent },
        { path: 'create-user', component: CreateUserComponent },
        { path: 'create-announcement', component: CreateAnnouncementComponent }
    ]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component:RegisterComponent},
    { path: '', component: HomeComponent, canActivate: [authGuard] },
    { path: '**', component: HomeComponent, canActivate: [authGuard] },

];
