import { Component } from '@angular/core';
import { AnnouncementsListComponent } from "../announcements-list/announcements-list.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [AnnouncementsListComponent]
})
export class HomeComponent {

}
