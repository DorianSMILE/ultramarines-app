import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleDTO } from '@models/role.dto';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles: RoleDTO[] = [];

  private apiUrl = 'https://localhost:8443/admin/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<RoleDTO[]> {
    return this.http.get<RoleDTO[]>(this.apiUrl);
  }

}
