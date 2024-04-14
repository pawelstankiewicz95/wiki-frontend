import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) { }

  public getRole(username: string): Observable<string> {
    return this.httpClient.get<string>(`${this.apiServerUrl}/role?username=${username}`);
  }

  public getAllUsers():Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiServerUrl);
  }
  
}
