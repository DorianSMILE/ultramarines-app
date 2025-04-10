import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UltramarineDTO } from '@models/ultramarine.dto';

@Injectable({
  providedIn: 'root'
})
export class GlobalUpdateService {
  private apiUrl = 'https://localhost:8443/ultramarine/global';

  constructor(private http: HttpClient) { }

  updateGlobal(ultramarine: UltramarineDTO): Observable<UltramarineDTO> {
    console.log("DTO dans global service :" + ultramarine);
    return this.http.put<UltramarineDTO>(this.apiUrl, ultramarine);
  }
}
