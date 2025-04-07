import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UltramarineDTO } from '../pages/models/ultramarine.dto';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private baseUrl = 'https://localhost:8443/equipments';

  constructor(private http: HttpClient) {}

  getEquipmentsByType(): Observable<{ [key: string]: string[] }> {
    return this.http.get<{ [key: string]: string[] }>(`${this.baseUrl}/available/byType`);
  }

  getUltramarineEquipments(ultramarineId: number): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(`${this.baseUrl}/ultramarine/${ultramarineId}`);
  }
}
