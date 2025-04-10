import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UltramarineService } from './ultramarine.service';
import { UltramarineDTO } from '@models/ultramarine.dto';

@Injectable({ providedIn: 'root' })
export class UltramarineStateService {

  private ultramarinesSubject = new BehaviorSubject<UltramarineDTO[]>([]);
  ultramarines$: Observable<UltramarineDTO[]> = this.ultramarinesSubject.asObservable();

  constructor(private ultramarineService: UltramarineService) { }

  loadUltramarines(): void {
    this.ultramarineService.getAll().subscribe({
      next: (data) => this.ultramarinesSubject.next(data),
      error: (err) => console.error('Erreur lors du chargement des ultramarines', err)
    });
  }

  refreshUltramarines(newList: UltramarineDTO[]): void {
    this.ultramarinesSubject.next(newList);
  }

}
