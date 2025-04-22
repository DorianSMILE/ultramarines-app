import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EquipmentAuthorizationDTO } from '@models/equipment.authorization.dto';
import { UltramarineSelectDTO } from '@models/ultramarine.select.dto';


@Injectable({
  providedIn: 'root'
})
export class EquipmentAuthorizationService {

  private baseUrl = 'https://localhost:8443/ultramarines/authorizations';

  constructor(private http: HttpClient) {}

  getAuthorizations(ultramarineId: number): Observable<EquipmentAuthorizationDTO> {
    return this.http.get<EquipmentAuthorizationDTO>(
      `${this.baseUrl}/${ultramarineId}`
    );
  }

  getAllAuthorizations(): Observable<EquipmentAuthorizationDTO[]> {
    return this.http.get<EquipmentAuthorizationDTO[]>(`${this.baseUrl}`);
  }

  updateAuthorization(authorization: EquipmentAuthorizationDTO): Observable<EquipmentAuthorizationDTO> {
    return this.http.put<EquipmentAuthorizationDTO>(`${this.baseUrl}`, authorization);
  }

  getUltramarinesWithoutAuthorization(): Observable<UltramarineSelectDTO[]> {
    return this.http.get<UltramarineSelectDTO[]>(`${this.baseUrl}/unauthorized`);
  }

  createAuthorizationFor(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/manual`, id );
  }

  deleteAuthorization(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
