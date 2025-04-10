import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../services/equipment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentDTO } from '../models/equipment.dto';
import { EquipmentFilterDTO } from '../models/equipment.filter.dto';
import { EquipmentTypeEnum } from '../models/equipment.filter.dto';
import { SupplyEnum } from '../models/equipment.filter.dto';
import { WeightEnum } from '../models/equipment.filter.dto';

@Component({
  selector: 'app-arsenal',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './arsenal.component.html',
  styleUrl: './arsenal.component.scss'
})
export class ArsenalComponent implements OnInit {

  equipments: EquipmentDTO[] = [];
  equipmentFilter: EquipmentFilterDTO = {};

  equipmentTypes = Object.values(EquipmentTypeEnum);
  supplyOptions = Object.values(SupplyEnum);
  weightOptions = Object.values(WeightEnum);

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.updateEquipments();
  }

  updateEquipments(): void {
    this.equipmentService.getAllEquipments(this.equipmentFilter).subscribe(
      (data: EquipmentDTO[]) => (this.equipments = data),
      (error) => {
        if (error.status === 404) {
          this.equipments = [];
          console.warn('Aucun équipement trouvé.');
        } else {
          console.error('Erreur lors de la récupération des équipements', error);
        }
      }
    );
  }

}
