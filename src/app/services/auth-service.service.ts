import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:8443';
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private currentUserKey = 'currentUser';

  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.accessTokenKey, response.accessToken);
        localStorage.setItem(this.refreshTokenKey, response.refreshToken);
        if (response.userResponseDTO) {
          localStorage.setItem(this.currentUserKey, JSON.stringify(response.userResponseDTO));
        }
        this.tokenSubject.next(response.accessToken);
      }),
      catchError((error: any) => {
        console.error('Erreur lors du login', error);
        return of(null);
      })
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (!refreshToken) {
      return of(null);
    }
    return this.http.get<any>(`${this.apiUrl}/refresh`, {
      headers: { Authorization: `Bearer ${refreshToken}` }
    }).pipe(
      tap(response => {
        localStorage.setItem(this.accessTokenKey, response.accessToken);
        this.tokenSubject.next(response.accessToken);
      }),
      catchError((error: any) => {
        console.error('Erreur lors du refresh token', error);
        return of(null);
      })
    );
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.accessTokenKey);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): any {
    const userJson = localStorage.getItem(this.currentUserKey);
    return userJson ? JSON.parse(userJson) : null;
  }

}
