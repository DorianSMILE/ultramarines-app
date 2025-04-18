import { MATERIAL_IMPORTS } from '@app/material';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentAuthorizationService } from '@services/equipment-authorization.service';
import { EquipmentAuthorizationDTO } from '@models/equipment.authorization.dto';

@Component({
  selector: 'app-equipment-authorization',
  imports: [CommonModule, FormsModule, ...MATERIAL_IMPORTS],
  standalone: true,
  templateUrl: './equipment-authorization.component.html',
  styleUrls: ['./equipment-authorization.component.scss']
})
export class EquipmentAuthorizationComponent implements OnInit, OnChanges {

  @Input() ultramarineId!: number;
  authorizationData?: EquipmentAuthorizationDTO;
  errorMessage: string = '';
  private lastLoadedId?: number;

  columnsToDisplay: string[] = ['key', 'value'];

  supplyDataSource: { key: string; value: string }[] = [];
  weightDataSource: { key: string; value: string }[] = [];

  constructor(private authService: EquipmentAuthorizationService) {}

  ngOnInit(): void {
    if (this.ultramarineId) {
      this.loadAuthorizations();
    }
  }

  ngOnChanges(): void {
    if (this.ultramarineId && this.ultramarineId !== this.lastLoadedId) {
      this.loadAuthorizations();
    }
  }

  loadAuthorizations(): void {
    this.errorMessage = '';
    this.lastLoadedId = this.ultramarineId;
    this.authService.getAuthorizations(this.ultramarineId).subscribe({
      next: (data) => {
        this.authorizationData = data;
        this.supplyDataSource = Object.entries(this.authorizationData.supplyAuthorizations)
          .map(([key, value]) => ({ key, value }));
        this.weightDataSource = Object.entries(this.authorizationData.weightAuthorizations)
          .map(([key, value]) => ({ key, value }));
      },
      error: (err) => {
        console.error(err);
        this.authorizationData = undefined;
        this.errorMessage = 'Erreur lors du chargement des autorisations';
      }
    });
  }

}
