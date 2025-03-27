import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../pages/models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:8443/admin';

  constructor(private http: HttpClient) { }

  createUser(userData: { username: string; password: string; roleId: number }): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiUrl}/create`, userData);
  }
}
