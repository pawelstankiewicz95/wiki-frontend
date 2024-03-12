import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private apiServerUrl = 'http://localhost:8080/api/announcements';

  constructor(private httpClient: HttpClient) { }

  public getAllAnnouncements(): Observable<Announcement[]> {
    return this.httpClient.get<Announcement[]>(this.apiServerUrl);
  }
  
}
