import { MATERIAL_IMPORTS } from '@app/material';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentAuthorizationService } from '@services/equipment-authorization.service';
import { EquipmentAuthorizationDTO } from '@models/equipment.authorization.dto';

@Component({
  selector: 'app-authorization-equipment-ultramarine',
  imports: [CommonModule, ...MATERIAL_IMPORTS],
  standalone: true,
  templateUrl: './authorization-equipment-ultramarine.component.html',
  styleUrl: './authorization-equipment-ultramarine.component.scss'
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
        this.dataSource.data = this.authorizations;
      },
      (error) => {
        console.error('Erreur lors de la récupération des autorisations', error);
      }
    );
  }

  objectKeys(obj: { [key: string]: any }) {
    return Object.keys(obj);
  }

}
