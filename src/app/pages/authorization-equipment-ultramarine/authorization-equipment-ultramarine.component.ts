import { MATERIAL_IMPORTS } from '@app/material';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthorizationUltramarineListComponent } from '@pages/authorization-ultramarine-list/authorization-ultramarine-list.component';
import { EquipmentAuthorizationService } from '@services/equipment-authorization.service';
import { EquipmentAuthorizationDTO } from '@models/equipment.authorization.dto';

@Component({
  selector: 'app-authorization-equipment-ultramarine',
  imports: [CommonModule, FormsModule, AuthorizationUltramarineListComponent, ...MATERIAL_IMPORTS],
  standalone: true,
  templateUrl: './authorization-equipment-ultramarine.component.html',
  styleUrls: ['./authorization-equipment-ultramarine.component.scss']
})
export class AuthorizationEquipmentUltramarineComponent implements OnInit {
  @ViewChild(AuthorizationUltramarineListComponent)
  manualListComponent?: AuthorizationUltramarineListComponent;

  authorizations: EquipmentAuthorizationDTO[] = [];
  dataSource = new MatTableDataSource<EquipmentAuthorizationDTO>(this.authorizations);
  displayedColumns: string[] = ['ultramarineId', 'supplyAuthorizations', 'weightAuthorizations', 'actions'];

  constructor(private equipmentAuthorizationService: EquipmentAuthorizationService) {}

  ngOnInit(): void {
    this.equipmentAuthorizationService.getAllAuthorizations().subscribe(
      (data) => {
        this.authorizations = data;
        this.preprocessAuthorizations(this.authorizations);
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

    if (currentValue !== 'custom') {
      delete authorization[section][customKey];
    }
  }

  updateCustomValue(authorization: any, section: string, category: string): void {
    const customKey = `${category}_custom`;
    const customValue = authorization[section][customKey];
    console.log(`Valeur custom entrée pour ${section} - ${category} :`, customValue);
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

  updateAuthorization(authorization: EquipmentAuthorizationDTO): void {
    this.replaceCustomValues(authorization.supplyAuthorizations);
    this.replaceCustomValues(authorization.weightAuthorizations);

    this.equipmentAuthorizationService.updateAuthorization(authorization).subscribe({
      next: (updated) => {
        console.log('Mise à jour réussie', updated),
        this.preprocessAuthorizations([updated]);
        const index = this.authorizations.findIndex(a => a.ultramarineId === updated.ultramarineId);
        if (index !== -1) {
          this.authorizations[index] = updated;
          this.dataSource.data = [...this.authorizations];
        }
        this.refreshAuthorizations();
        this.manualListComponent?.refresh();
      },
      error: (err) => console.error('Erreur lors de la mise à jour', err)
    });
  }

  private replaceCustomValues(section: any): void {
    this.objectKeys(section).forEach((key) => {
      if (key.endsWith('_custom')) return;
      if (section[key] === 'custom') {
        const customKey = `${key}_custom`;
        const customValue = section[customKey];
        if (customValue !== undefined && !isNaN(customValue)) {
          section[key] = customValue.toString();
        } else {
          section[key] = 'unautorized';
        }
        delete section[customKey];
      }
    });
  }

  refreshAuthorizations() {
    this.equipmentAuthorizationService.getAllAuthorizations().subscribe(
      (data) => {
        this.authorizations = data;
        this.preprocessAuthorizations(this.authorizations);
        this.dataSource.data = this.authorizations;
      },
      (error) => {
        console.error('Erreur lors de la récupération des autorisations', error);
      }
    );
  }

  deleteAuthorization(id: number): void {
    this.equipmentAuthorizationService.deleteAuthorization(id).subscribe({
      next: () => {
        // Enlève l'élément du tableau
        this.authorizations = this.authorizations.filter(auth => auth.ultramarineId !== id);
        this.dataSource.data = [...this.authorizations];
        this.manualListComponent?.refresh();
      },
      error: err => {
        console.error('Erreur lors de la suppression', err);
      }
    });
  }

}
