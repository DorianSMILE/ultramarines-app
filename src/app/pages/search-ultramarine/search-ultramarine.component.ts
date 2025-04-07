import { Component, OnInit } from '@angular/core';
import { UltramarineService } from '../../services/ultramarine.service';
import { GlobalUpdateService } from '../../services/global-update.service';
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
export class SearchUltramarineComponent implements OnInit {

  researchUltramarineForm: FormGroup;
  ultramarines: UltramarineDTO[] = [];
  selectedUltramarine: UltramarineDTO | null = null;

  updatedInfo: Partial<UltramarineDTO> = {};
  updatedEquipment: Partial<UltramarineDTO> = {};

  constructor(private fb: FormBuilder, private ultramarineService: UltramarineService, private globalUpdateService: GlobalUpdateService) {
    this.researchUltramarineForm = this.fb.group({
      username: [''],
    });
  }

  ngOnInit() {
    this.loadUltramarines();
  }

  loadUltramarines() {
    this.ultramarineService.getAll().subscribe(data => {
      this.ultramarines = data;
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
      error: (err: any) => console.error('Erreur lors de la récupération de l\'ultramarine', err)
    });
  }

  handleInfoUpdate(info: Partial<UltramarineDTO>): void {
    if (this.selectedUltramarine) {
      this.selectedUltramarine = { ...this.selectedUltramarine, ...info };
      this.loadUltramarines();
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

  handleCancelUpdate(): void {
    this.selectedUltramarine = null;
  }

}
