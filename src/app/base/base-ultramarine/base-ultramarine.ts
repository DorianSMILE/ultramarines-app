import { Directive, OnInit } from '@angular/core';
import { UltramarineService } from '@services/ultramarine.service';
import { UltramarineStateService } from '@services/ultramarine-state.service';
import { UltramarineDTO } from '@models/ultramarine.dto';

@Directive()
export abstract class BaseUltramarine implements OnInit {
  ultramarines: UltramarineDTO[] = [];
  selectedUltramarine: UltramarineDTO | null = null;
  updatedInfo: Partial<UltramarineDTO> = {};
  updatedEquipment: Partial<UltramarineDTO> = {};

  constructor(
      protected ultramarineService: UltramarineService,
      protected ultramarineStateService: UltramarineStateService
    ) {}

  ngOnInit(): void {
    this.subscribeToState();
    this.ultramarineStateService.loadUltramarines();
  }

  private subscribeToState(): void {
    this.ultramarineStateService.ultramarines$.subscribe({
      next: (data) => {
        this.ultramarines = data;
      },
      error: (err) => console.error('Erreur lors de la réception de l\'état des ultramarines', err)
    });
  }

  loadUltramarines(): void {
    this.ultramarineStateService.loadUltramarines();
  }

  updateUltramarine(id: number): void {
    this.ultramarineService.getById(id).subscribe({
      next: (result: UltramarineDTO) => {
        this.updatedInfo = {};
        this.updatedEquipment = {};
        this.selectedUltramarine = null;
        setTimeout(() => {
          this.selectedUltramarine = result;
        }, 0);
      },
      error: err => console.error('Erreur lors de la récupération de l\'ultramarine', err)
    });
  }

  handleInfoUpdate(info: Partial<UltramarineDTO>): void {
    if (this.selectedUltramarine) {
      this.selectedUltramarine = { ...this.selectedUltramarine, ...info };
      console.log('Ultramarine mis à jour dans le parent (infos):', this.selectedUltramarine);
      this.loadUltramarines();
    }
  }

  handleCancelUpdate(): void {
    this.selectedUltramarine = null;
  }

}
