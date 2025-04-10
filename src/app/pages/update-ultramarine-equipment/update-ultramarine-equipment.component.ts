import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentService } from '@services/equipment.service';
import { GlobalUpdateService } from '@services/global-update.service';
import { UltramarineDTO } from '@models/ultramarine.dto';

@Component({
  selector: 'app-update-ultramarine-equipment',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './update-ultramarine-equipment.component.html',
  styleUrls: ['./update-ultramarine-equipment.component.scss']
})
export class UpdateUltramarineEquipmentComponent implements OnInit {

  @Input() ultramarine!: UltramarineDTO;
  @Output() equipmentUpdate: EventEmitter<Partial<UltramarineDTO>> = new EventEmitter<Partial<UltramarineDTO>>();

  availableEquipments: { [key: string]: string[] } = {};
  localEquipments: { [key: string]: string } = {};

  constructor(private equipmentService: EquipmentService, private globalUpdateService: GlobalUpdateService) {}

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
    if (this.ultramarine && this.ultramarine.id != null && this.ultramarine.equipments) {
      this.ultramarine.equipments.forEach(equip => {
        this.localEquipments[equip.equipmentType] = equip.name;
      });
      console.log('Equipements assignés initialisés:', this.localEquipments);
    }
  }

  get equipmentTypes(): string[] {
    return Object.keys(this.availableEquipments);
  }

  updateEquipments(): void {
    const updatedDTO: UltramarineDTO = {
      id: this.ultramarine.id,
      name: null,
      grade: null,
      equipments: Object.keys(this.localEquipments).map(key => ({
        equipmentType: key,
        name: this.localEquipments[key]
      }))
    };
console.log("DTO dans equipement component :" + updatedDTO);
    this.globalUpdateService.updateGlobal(updatedDTO).subscribe({
      next: updated => {
        console.log('Mise à jour globale réussie (équipements) :', updated);
      },
      error: err => console.error('Erreur lors de la mise à jour globale (équipements) :', err)
    });
  }

  emitUpdate(): void {
    const equipmentsList = Object.keys(this.localEquipments).map(key => ({
      equipmentType: key,
      name: this.localEquipments[key]
    }));
    this.equipmentUpdate.emit({ equipments: equipmentsList });
  }

}
