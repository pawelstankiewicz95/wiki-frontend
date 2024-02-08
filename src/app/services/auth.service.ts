// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth/';

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<string> {
        const credentials = { username, password };
        return this.http.post<string>(`${this.apiUrl}authenticate`, credentials);
    }

    storeJwtToken(token: string): void {
        localStorage.setItem('jwtToken', token);
    }

    getJwtToken(): string | null {
        return localStorage.getItem('jwtToken');
    }

    logout(): void {
        localStorage.removeItem('jwtToken');
      }

    isLoggedIn(): boolean {
        return !!this.getJwtToken();
    }

}