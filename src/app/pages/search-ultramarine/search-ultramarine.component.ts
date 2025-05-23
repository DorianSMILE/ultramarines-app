import { MATERIAL_IMPORTS } from '@app/material';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UltramarineService } from '@services/ultramarine.service';
import { GlobalUpdateService } from '@services/global-update.service';
import { UltramarineStateService } from '@services/ultramarine-state.service';
import { EquipmentAuthorizationService } from '@services/equipment-authorization.service';
import { UltramarineDTO } from '@models/ultramarine.dto';
import { UpdateUltramarineComponent } from '@pages/update-ultramarine/update-ultramarine.component';
import { UpdateUltramarineEquipmentComponent } from '@pages/update-ultramarine-equipment/update-ultramarine-equipment.component';
import { BaseUltramarine } from '@base/base-ultramarine/base-ultramarine';

@Component({
  selector: 'app-search-ultramarine',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    UpdateUltramarineComponent,
    UpdateUltramarineEquipmentComponent,
    ...MATERIAL_IMPORTS
    ],
  templateUrl: './search-ultramarine.component.html',
  styleUrls: ['./search-ultramarine.component.scss']
})
export class SearchUltramarineComponent extends BaseUltramarine {

  displayedColumns: string[] = ['id', 'name', 'grade', 'actions'];

  researchUltramarineForm: FormGroup;

  constructor(
      ultramarineService: UltramarineService,
      ultramarineStateService: UltramarineStateService,
      equipmentAuthorizationService: EquipmentAuthorizationService,
      private fb: FormBuilder,
      private globalUpdateService: GlobalUpdateService
    ) {
    super(ultramarineService, ultramarineStateService, equipmentAuthorizationService);
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
