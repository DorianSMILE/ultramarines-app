import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


interface UltramarineDTO {
  id?: number;
  name: string;
  grade: string;
}

@Injectable({
  providedIn: 'root'
})
export class UltramarineService {

  private apiUrl = 'http://localhost:8080/ultramarines/';

  constructor(private http: HttpClient) { }

   // Obtenir la liste des ultramarines
  getAll(): Observable<UltramarineDTO[]> {
    return this.http.get<UltramarineDTO[]>(this.apiUrl);
  }

  // Créer un nouvel ultramarine
  create(ultramarine: UltramarineDTO): Observable<UltramarineDTO> {
    return this.http.post<UltramarineDTO>(`${this.apiUrl}create`, ultramarine)
        .pipe(
          catchError((error) => {
            console.error('Erreur lors de la création de l\'ultramarine:', error);
            return throwError(() => new Error(error));
          })
        );
  }

  // Supprimer un ultramarine
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
