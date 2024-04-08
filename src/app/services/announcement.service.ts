import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private apiServerUrl = 'http://localhost:8080/api/announcements';

  private _announcements = new BehaviorSubject<Announcement[]>([]);
  announcements$ = this._announcements.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getAllAnnouncements(): Observable<Announcement[]> {
    return this.httpClient.get<Announcement[]>(this.apiServerUrl);
  }

  public saveAnnouncement(announcement: Announcement): Observable<Announcement> {

    return this.httpClient.post<Announcement>(this.apiServerUrl, announcement)
      .pipe(
        tap((savedAnnouncement: Announcement) => {
          const currentAnnouncements = this._announcements.getValue();
          this._announcements.next([...currentAnnouncements, savedAnnouncement]);
        })
      );
  }
  
}
