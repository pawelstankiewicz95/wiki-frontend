import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';

export const authIterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  console.log('Interceptor is running...');
  if (authService.hasValidToken()) {
    const authToken = authService.getJwtToken();
    console.log("Bearer Token Attached:", authToken);
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
    });

    return next(authReq);
  } else {
    return next(req);
  }
};