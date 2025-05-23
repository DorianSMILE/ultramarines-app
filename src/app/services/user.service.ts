import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordDTO } from '@models/change.password.dto';
import { UserDTO } from '@models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:8443';

  constructor(private http: HttpClient) { }

  createUser(userData: { username: string; password: string; roleId: number }): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiUrl}/admin/create`, userData);
  }

  firstConnexion(uuid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/firstConnexion/${uuid}`);
  }

  changePassword(uuid: string, newPassword: string): Observable<any> {
    const requestBody: ChangePasswordDTO = { uuid, password: newPassword };
    return this.http.post<any>(`${this.apiUrl}/admin/changePassword`, requestBody, { responseType: 'text' as 'json' });
  }

}
