import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentService } from '../../services/equipment.service';
import { UltramarineDTO } from '../models/ultramarine.dto';

@Component({
  selector: 'app-update-ultramarine-equipment',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './update-ultramarine-equipment.component.html',
  styleUrls: ['./update-ultramarine-equipment.component.scss']
})
export class UpdateUltramarineEquipmentComponent implements OnInit {

  @Input() ultramarine!: UltramarineDTO;
  @Output() updateComplete: EventEmitter<boolean> = new EventEmitter<boolean>();

  availableEquipments: { [key: string]: string[] } = {};
  ultramarineEquipments: { [key: string]: string } = {};

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.loadAvailableEquipments();
    this.loadUltramarineEquipments();
  }

  loadAvailableEquipments(): void {
    this.equipmentService.getEquipmentsByType().subscribe({
      next: data => {
        this.availableEquipments = data;
        console.log('Equipements disponibles:', this.availableEquipments);
      },
      error: err => console.error(err)
    });
  }

  loadUltramarineEquipments(): void {
    if (this.ultramarine && this.ultramarine.id != null) {
      this.equipmentService.getUltramarineEquipments(this.ultramarine.id).subscribe({
        next: data => {
          this.ultramarineEquipments = data;
          console.log('Equipements assignés:', this.ultramarineEquipments);
        },
        error: err => console.error(err)
      });
    }
  }

  onEquipmentChange(type: string, newValue: string): void {
    this.ultramarineEquipments[type] = newValue;
  }

  // Méthode pour déclencher la mise à jour des équipements
  updateEquipments(): void {
    if (this.ultramarine && this.ultramarine.id) {
      this.equipmentService.updateEquipments(this.ultramarine, this.ultramarineEquipments)
        .subscribe({
          next: (response) => {
            console.log('Equipements mis à jour', response);
            this.updateComplete.emit(true);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour des équipements', error);
            this.updateComplete.emit(false);
          }
        });
    }
  }

  get equipmentTypes(): string[] {
    return Object.keys(this.availableEquipments);
  }

}
