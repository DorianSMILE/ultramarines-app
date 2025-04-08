import { Component, OnInit } from '@angular/core';
import { UltramarineService } from '../../services/ultramarine.service';
import { GlobalUpdateService } from '../../services/global-update.service';
import { UltramarineStateService } from '../../services/ultramarine-state.service';
import { BaseUltramarine } from '../../base/base-ultramarine/base-ultramarine';
import { HttpClientModule } from '@angular/common/http';
import { UltramarineDTO } from '../models/ultramarine.dto';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateUltramarineComponent } from '../update-ultramarine/update-ultramarine.component';
import { UpdateUltramarineEquipmentComponent } from '../update-ultramarine-equipment/update-ultramarine-equipment.component';

@Component({
  selector: 'app-search-ultramarine',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, UpdateUltramarineComponent, UpdateUltramarineEquipmentComponent],
  templateUrl: './search-ultramarine.component.html',
  styleUrls: ['./search-ultramarine.component.scss']
})
export class SearchUltramarineComponent extends BaseUltramarine {

  researchUltramarineForm: FormGroup;

  constructor(
      ultramarineService: UltramarineService,
      ultramarineStateService: UltramarineStateService,
      private fb: FormBuilder,
      private globalUpdateService: GlobalUpdateService
    ) {
    super(ultramarineService, ultramarineStateService);
    this.researchUltramarineForm = this.fb.group({
      username: [''],
    });
  }

  onSubmit(): void {
    if (this.researchUltramarineForm.valid) {
      const username = this.researchUltramarineForm.value.username.trim();
      if (!username) {
          this.loadUltramarines();
      } else {
        this.ultramarineService.getByName(username).subscribe({
          next: (results: UltramarineDTO[]) => {
            this.ultramarines = results;
          },
          error: (err: any) => console.error('Erreur lors de la recherche', err)
        });
      }
    }
  }

  handleEquipmentUpdate(equipment: Partial<UltramarineDTO>): void {
    this.updatedEquipment = { ...this.updatedEquipment, ...equipment };
    console.log('Equipement mis à jour:', this.updatedEquipment);
  }

  updateGlobal(): void {
    if (this.selectedUltramarine) {
      const completeDTO: UltramarineDTO = {
        id: this.selectedUltramarine.id,
        name: this.updatedInfo.name || this.selectedUltramarine.name,
        grade: this.updatedInfo.grade || this.selectedUltramarine.grade,
        equipments: this.updatedEquipment.equipments || this.selectedUltramarine.equipments
      };

      this.globalUpdateService.updateGlobal(completeDTO).subscribe({
        next: updated => {
          console.log('Mise à jour globale réussie', updated);
          this.selectedUltramarine = updated;
          this.loadUltramarines();
        },
        error: err => console.error('Erreur lors de la mise à jour globale', err)
      });
    }
  }

}
