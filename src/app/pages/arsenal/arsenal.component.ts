import { MATERIAL_IMPORTS } from '@app/material';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { EquipmentService } from '@services/equipment.service';
import { EquipmentDTO } from '@models/equipment.dto';
import { EquipmentFilterDTO } from '@models/equipment.filter.dto';
import { EquipmentTypeEnum } from '@models/equipment.filter.dto';
import { SupplyEnum } from '@models/equipment.filter.dto';
import { WeightEnum } from '@models/equipment.filter.dto';

type FilterKey = 'equipmentType' | 'supply' | 'weight';

interface FilterState<T> {
  selected: T[];
  options: T[];
}

@Component({
  selector: 'app-arsenal',
  standalone: true,
  imports: [CommonModule, FormsModule, ...MATERIAL_IMPORTS],
  templateUrl: './arsenal.component.html',
  styleUrl: './arsenal.component.scss'
})
export class ArsenalComponent implements OnInit {
  equipments: EquipmentDTO[] = [];
  dataSource = new MatTableDataSource<EquipmentDTO>([]);

  filters: Record<FilterKey, FilterState<any>> = {
    equipmentType: {
      selected: [],
      options: Object.values(EquipmentTypeEnum)
    },
    supply: {
      selected: [],
      options: Object.values(SupplyEnum)
    },
    weight: {
      selected: [],
      options: Object.values(WeightEnum)
    }
  };

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.updateEquipments();
  }

  updateEquipments(): void {
    const filter: EquipmentFilterDTO = {
      equipmentType: this.filters.equipmentType.selected.length ? this.filters.equipmentType.selected : undefined,
      supply: this.filters.supply.selected.length ? this.filters.supply.selected : undefined,
      weight: this.filters.weight.selected.length ? this.filters.weight.selected : undefined
    };

    this.equipmentService.getAllEquipments(filter).subscribe({
      next: (data) => {
        this.equipments = data;
        this.dataSource.data = data;
      },
      error: (err) => {
        if (err.status === 404) {
          this.equipments = [];
          this.dataSource.data = [];
          console.warn('Aucun équipement trouvé.');
        } else {
          console.error('Erreur lors de la récupération des équipements', err);
        }
      }
    });
  }

  toggleChipSelection<T>(filter: FilterState<T>, value: T): void {
    const index = filter.selected.indexOf(value);
    if (index >= 0) {
      filter.selected.splice(index, 1);
    } else {
      filter.selected.push(value);
    }
    this.updateEquipments();
  }

  isSelected<T>(filter: FilterState<T>, value: T): boolean {
    return filter.selected.includes(value);
  }

  toggleAll<T>(filter: FilterState<T>): void {
    if (filter.selected.length === filter.options.length) {
      filter.selected = [];
    } else {
      filter.selected = [...filter.options];
    }
    this.updateEquipments();
  }

  isAllSelected<T>(filter: FilterState<T>): boolean {
    return filter.selected.length === filter.options.length;
  }
}
