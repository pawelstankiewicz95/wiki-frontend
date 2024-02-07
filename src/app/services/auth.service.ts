// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth/';

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<string> {
        const credentials = { username, password };
        return this.http.post<string>(`${this.apiUrl}/authenticate`, credentials);
    }

    // Store JWT in local storage
    storeJwtToken(token: string): void {
        localStorage.setItem('jwtToken', token);
    }

    // Retrieve JWT from local storage
    getJwtToken(): string | null {
        return localStorage.getItem('jwtToken');
    }
}