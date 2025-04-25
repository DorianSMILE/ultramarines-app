import { MATERIAL_IMPORTS } from '@app/material';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentService } from '@services/equipment.service';
import { GlobalUpdateService } from '@services/global-update.service';
import { UltramarineDTO } from '@models/ultramarine.dto';
import { EquipmentAuthorizationDTO } from '@models/equipment.authorization.dto';
import { EquipmentTypeEnum } from '@models/enum/equipment.enums';
import { SupplyEnum } from '@models/enum/equipment.enums';
import { WeightEnum } from '@models/enum/equipment.enums';

@Component({
  selector: 'app-update-ultramarine-equipment',
  imports: [CommonModule, FormsModule, ...MATERIAL_IMPORTS],
  standalone: true,
  templateUrl: './update-ultramarine-equipment.component.html',
  styleUrls: ['./update-ultramarine-equipment.component.scss']
})
export class UpdateUltramarineEquipmentComponent implements OnInit, OnChanges {

  @Input() ultramarine!: UltramarineDTO;
  @Input() equipmentAuthorization?: EquipmentAuthorizationDTO | null;
  @Output() equipmentUpdate: EventEmitter<Partial<UltramarineDTO>> = new EventEmitter<Partial<UltramarineDTO>>();

  availableEquipments: Record<string,string[]> = {};
  localEquipments: Record<string,string> = {};
  isPatching: boolean = false;

  private equipmentByName: Record<string, { supply: SupplyEnum; weight: WeightEnum }> = {};
  authorizationColors: Record<string, Record<string, ''|'warn'|'accent'>> = {};

  constructor(
    private equipmentService: EquipmentService,
    private globalUpdateService: GlobalUpdateService
  ) {}

  ngOnInit(): void {
    this.loadAvailableEquipments();
    this.loadUltramarineEquipments();
    this.applyAuthorizationColors();
  }

  ngOnChanges(): void {
    if (this.ultramarine) {
      this.isPatching = true;
      this.localEquipments = {};
      this.authorizationColors = {};
      this.loadUltramarineEquipments();
      this.applyAuthorizationColors();
      setTimeout(() => this.isPatching = false, 0);
    }
  }

  loadUltramarineEquipments(): void {
    //this.ultramarine?.equipments tester de replace par ça
    if (this.ultramarine && this.ultramarine.id != null && this.ultramarine.equipments) {
      this.ultramarine.equipments.forEach(equip => {
        this.localEquipments[equip.equipmentType] = equip.name;
      });
    }
  }

  loadAvailableEquipments(): void {
    this.equipmentService.getAllEquipments({}).subscribe({
      next: (list) => {
        this.availableEquipments = {};
        this.equipmentByName = {};

        list.forEach(eq => {
          (this.availableEquipments[eq.equipmentType] ??= []).push(eq.name);

          if (eq.supply != null && eq.weight != null) {
            this.equipmentByName[eq.name] = {
              supply: eq.supply as SupplyEnum,
              weight: eq.weight as WeightEnum
            };
          }
        });

        this.applyAuthorizationColors();
      },
      error: err => console.error(err)
    });
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

  applyAuthorizationColors(): void {
    if (!this.equipmentAuthorization) return;
    this.authorizationColors = {};

    for (const type of Object.keys(this.availableEquipments)) {
      const byName: Record<string,''|'warn'|'accent'> = {};
      for (const name of this.availableEquipments[type]!) {
        const { supply, weight } = this.equipmentByName[name];
        const supAuth = this.equipmentAuthorization.supplyAuthorizations[supply];
        const wAuth   = this.equipmentAuthorization.weightAuthorizations[weight];

        let color: ''|'warn'|'accent' = '';
        if (supAuth==='unautorized' || wAuth==='unautorized') {
          color = 'warn';
        } else {
          const limit = parseInt(wAuth, 10);
          if (!isNaN(limit)) {
            const used = Object.values(this.localEquipments)
                              .filter(n => this.equipmentByName[n]?.weight===weight)
                              .length;
            if (used >= limit) color = 'accent';
          }
        }
        byName[name] = color;
        console.log('Color : ', color);
      }
      this.authorizationColors[type] = byName;
    }
  }

}
