import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth/';

    private loggedIn = new BehaviorSubject<boolean>(this.hasValidToken());
    isLoggedIn$ = this.loggedIn.asObservable();
  
    constructor(private http: HttpClient) { }

    hasValidToken(): boolean { 
        const token = this.getJwtToken();
        return !!token && !this.isTokenExpired(token);
      }

      login(username: string, password: string): Observable<any> { 
        const credentials = { username, password };
        return this.http.post<any>(`${this.apiUrl}authenticate`, credentials).pipe(
          tap(response => { 
            console.log('Logged in succefully')
            const token = response.token;
            this.storeJwtToken(token);
            this.loggedIn.next(true)}), 

            catchError(err => {
                if (err.status === 403) {
                    console.error('Login failed: Invalid credentials'); 
                    return throwError(() => new Error('Invalid credentials'));
                } else {
                    console.error('Unexpected login error:', err);
                    return throwError(() => new Error('Unexpected error'));
                }
            })
        );
      }

    storeJwtToken(token: string): void {
      if (typeof token === 'string') {
        localStorage.setItem('jwtToken', token);
    } else {
        // Convert the object to a string, for example using JSON.stringify
        localStorage.setItem('jwtToken', JSON.stringify(token));
    }
    }

    getJwtToken(): string | null {
        return localStorage.getItem('jwtToken');
    }

    logout(): void {
        localStorage.removeItem('jwtToken');
         this.loggedIn.next(false);
      }

    isLoggedIn(): boolean {
        return !!this.getJwtToken();
    }

    isTokenExpired(token: string): boolean {
        try {
          const decoded: any = jwtDecode(token);
          const expirationTimestamp = decoded.exp;
      
          if (expirationTimestamp) {
            return expirationTimestamp * 1000 < Date.now();
          } else {
            return false;
          }
        } catch (err) {
          return false;
        }
      }

}