import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth-service.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.handle401Error(request, next);
          }
          return throwError(error);
        })
      );
    }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.tokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response) => {
          this.isRefreshing = false;
          if (response && response.accessToken) {
            this.tokenSubject.next(response.accessToken);
            const clonedRequest = request.clone({
              setHeaders: { Authorization: `Bearer ${response.accessToken}` }
            });
            return next.handle(clonedRequest);
          }
          this.authService.logout();
          this.router.navigate(['/login']);
          return throwError('Refresh token échoué');
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.authService.logout();
          this.router.navigate(['/login']);
          return throwError(err);
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          const clonedRequest = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
          return next.handle(clonedRequest);
        })
      );
    }
  }
}
