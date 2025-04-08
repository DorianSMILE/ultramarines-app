import { Component, OnInit } from '@angular/core';
import { UltramarineService } from '../../services/ultramarine.service';
import { UltramarineStateService } from '../../services/ultramarine-state.service';
import { BaseUltramarine } from '../../base/base-ultramarine/base-ultramarine';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UltramarineDTO } from '../models/ultramarine.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateUltramarineComponent } from '../create-ultramarine/create-ultramarine.component';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { UpdateUltramarineComponent } from '../update-ultramarine/update-ultramarine.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, CreateUltramarineComponent, UpdateUltramarineComponent]
})
export class HomeComponent extends BaseUltramarine {

  constructor(
    ultramarineService: UltramarineService,
    ultramarineStateService: UltramarineStateService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
      super(ultramarineService, ultramarineStateService);
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
