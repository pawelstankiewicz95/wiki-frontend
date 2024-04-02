import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UsersComponent } from "./users/users.component";

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [RouterOutlet, RouterModule, UsersComponent]
})
export class AdminDashboardComponent {

}
