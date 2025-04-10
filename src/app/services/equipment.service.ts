import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UltramarineDTO } from '@models/ultramarine.dto';
import { EquipmentFilterDTO } from '@models/equipment.filter.dto';
import { EquipmentDTO } from '@models/equipment.dto';

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

  getAllEquipments(equipmentFilter: EquipmentFilterDTO): Observable<EquipmentDTO[]> {
    return this.http.post<EquipmentDTO[]>(`${this.baseUrl}/filtre`, equipmentFilter);
  }

}
