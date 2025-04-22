import { MATERIAL_IMPORTS } from '@app/material';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentAuthorizationService } from '@services/equipment-authorization.service';
import { UltramarineSelectDTO } from '@models/ultramarine.select.dto';

@Component({
  selector: 'app-authorization-ultramarine-list',
  imports: [CommonModule, FormsModule, ...MATERIAL_IMPORTS],
  standalone: true,
  templateUrl: './authorization-ultramarine-list.component.html',
  styleUrl: './authorization-ultramarine-list.component.scss'
})
export class AuthorizationUltramarineListComponent implements OnInit {

  @Output() authorizationCreated = new EventEmitter<void>();

  constructor(private equipmentAuthorizationService: EquipmentAuthorizationService) {}

  ultramarines: UltramarineSelectDTO[] = [];
  selectedId: string | null = null;

  ngOnInit() {
    this.refresh();
  }

  createManualAuth() {
    if (!this.selectedId) return;

    this.equipmentAuthorizationService.createAuthorizationFor(this.selectedId)
      .subscribe(() => {
        this.ultramarines = this.ultramarines.filter(u => u.id !== this.selectedId);
        this.selectedId = null;
        this.authorizationCreated.emit();
      });
  }

  refresh(): void {
    this.equipmentAuthorizationService.getUltramarinesWithoutAuthorization()
      .subscribe(data => this.ultramarines = data);
  }

}
