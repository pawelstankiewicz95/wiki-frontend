import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiServerUrl = 'http://localhost:8080/api/chat/messages';

  private _messages = new BehaviorSubject<Message[]>([]);
  messages$ = this._messages.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.apiServerUrl);
  }

  public saveMessage(message: Message): Observable<Message> {
    const url = this.apiServerUrl;
    return this.httpClient.post<Message>(url, message)
      .pipe(
        tap((savedMessage: Message) => {
          const currentSolutions = this._messages.getValue();
          this._messages.next([...currentSolutions, savedMessage]);
        })
      );
  }
}
