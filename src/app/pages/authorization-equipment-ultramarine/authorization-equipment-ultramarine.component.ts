import { MATERIAL_IMPORTS } from '@app/material';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentAuthorizationService } from '@services/equipment-authorization.service';
import { EquipmentAuthorizationDTO } from '@models/equipment.authorization.dto';

@Component({
  selector: 'app-authorization-equipment-ultramarine',
  imports: [CommonModule, FormsModule, ...MATERIAL_IMPORTS],
  standalone: true,
  templateUrl: './authorization-equipment-ultramarine.component.html',
  styleUrls: ['./authorization-equipment-ultramarine.component.scss']
})
export class AuthorizationEquipmentUltramarineComponent implements OnInit {

  authorizations: EquipmentAuthorizationDTO[] = [];
  dataSource = new MatTableDataSource<EquipmentAuthorizationDTO>(this.authorizations);
  displayedColumns: string[] = ['ultramarineId', 'supplyAuthorizations', 'weightAuthorizations'];

  constructor(private equipmentAuthorizationService: EquipmentAuthorizationService) {}

  ngOnInit(): void {
    this.equipmentAuthorizationService.getAllAuthorizations().subscribe(
      (data) => {
        this.authorizations = data;
        this.preprocessAuthorizations(this.authorizations); // ✔️
        this.dataSource.data = this.authorizations;
      },
      (error) => {
        console.error('Erreur lors de la récupération des autorisations', error);
      }
    );
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  isCustomValue(authorization: any, section: string, category: string): boolean {
    const value = authorization[section][category];
    return value === 'custom' || !isNaN(value);
  }

  filterKeys(keys: string[]): string[] {
    return keys.filter(key => !key.endsWith('_custom'));
  }

  onSelectionChange(authorization: any, section: string, category: string): void {
    const currentValue = authorization[section][category];
    const customKey = `${category}_custom`;

    if (currentValue === 'custom') {
      if (!authorization[section][customKey] && !isNaN(currentValue)) {
        // Si un nombre était défini avant, le remettre dans le champ custom
        authorization[section][customKey] = Number(currentValue);
      }
    }
  }

  updateCustomValue(authorization: any, section: string, category: string): void {
    const customKey = `${category}_custom`;
    const customValue = authorization[section][customKey];
    if (customValue !== undefined && customValue !== null) {
      authorization[section][category] = customValue.toString();
    }
  }

  preprocessAuthorizations(authorizations: EquipmentAuthorizationDTO[]) {
    authorizations.forEach((authorization) => {
      // Supply
      Object.keys(authorization.supplyAuthorizations).forEach((key) => {
        const value = authorization.supplyAuthorizations[key];
        if (!isNaN(Number(value))) {
          authorization.supplyAuthorizations[key] = 'custom';
          authorization.supplyAuthorizations[key + '_custom'] = String(value);
        }
      });

      // Weight
      Object.keys(authorization.weightAuthorizations).forEach((key) => {
        const value = authorization.weightAuthorizations[key];
        if (!isNaN(Number(value))) {
          authorization.weightAuthorizations[key] = 'custom';
          authorization.weightAuthorizations[key + '_custom'] = String(value);
        }
      });
    });
  }

}
