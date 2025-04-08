import { Directive, OnInit } from '@angular/core';
import { UltramarineService } from '../../services/ultramarine.service';
import { UltramarineDTO } from '../../pages/models/ultramarine.dto';

@Directive()
export abstract class BaseUltramarine implements OnInit {
  ultramarines: UltramarineDTO[] = [];
  selectedUltramarine: UltramarineDTO | null = null;
  updatedInfo: Partial<UltramarineDTO> = {};
  updatedEquipment: Partial<UltramarineDTO> = {};

  constructor(protected ultramarineService: UltramarineService) {}

  ngOnInit(): void {
    this.loadUltramarines();
  }

  loadUltramarines(): void {
    this.ultramarineService.getAll().subscribe({
      next: (data) => this.ultramarines = data,
      error: (err) => console.error('Erreur lors du chargement des ultramarines', err)
    });
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
