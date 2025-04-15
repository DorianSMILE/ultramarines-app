import { MATERIAL_IMPORTS } from '@app/material';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UltramarineService } from '@services/ultramarine.service';
import { UltramarineStateService } from '@services/ultramarine-state.service';
import { AuthService } from '@services/auth-service.service';
import { EquipmentAuthorizationService } from '@services/equipment-authorization.service';
import { UltramarineDTO } from '@models/ultramarine.dto';
import { CreateUltramarineComponent } from '@pages/create-ultramarine/create-ultramarine.component';
import { UpdateUltramarineComponent } from '@pages/update-ultramarine/update-ultramarine.component';
import { EquipmentAuthorizationComponent } from '@pages/equipment-authorization/equipment-authorization.component';
import { BaseUltramarine } from '@base/base-ultramarine/base-ultramarine';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CreateUltramarineComponent,
    UpdateUltramarineComponent,
    EquipmentAuthorizationComponent,
    ...MATERIAL_IMPORTS
  ]
})
export class HomeComponent extends BaseUltramarine {

  constructor(
    ultramarineService: UltramarineService,
    ultramarineStateService: UltramarineStateService,
    equipmentAuthorizationService: EquipmentAuthorizationService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
      super(ultramarineService, ultramarineStateService, equipmentAuthorizationService);
    }

  deleteUltramarine(id?: number): void {
    if (id !== undefined) {
        this.ultramarineService.delete(id).subscribe({
          next: () => {
            this.ultramarines = this.ultramarines.filter(u => u.id !== id);
          },
          error: (err) => {
            console.error('Erreur de suppression', err);
          }
        });
      } else {
        console.error("L'ID de l'ultramarine est indéfini !");
      }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
