import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.hasValidToken()) { 
            const authToken = this.authService.getJwtToken();

            const authReq = req.clone({ 
                setHeaders: { Authorization: `Bearer ${authToken}` } 
            });

            return next.handle(authReq); 
        } else {
            return next.handle(req); 
        }
    }
}
