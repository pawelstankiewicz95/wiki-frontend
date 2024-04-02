import { Component } from '@angular/core';
import { Announcement } from '../../../models/announcement';
import { AnnouncementService } from '../../../services/announcement.service';

@Component({
  selector: 'app-announcements-list',
  standalone: true,
  imports: [],
  templateUrl: './announcements-list.component.html',
  styleUrl: './announcements-list.component.css'
})
export class AnnouncementsListComponent {

  public announcements: Announcement[] = [];

  constructor(private announcementService: AnnouncementService){};

  ngOnInit(): void {
    this.getAllAnnoucements();
    }

  getAllAnnoucements(){
    this.announcementService.getAllAnnouncements().subscribe((response: Announcement[]) => this.announcements = response);
  }

}
