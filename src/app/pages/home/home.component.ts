import { Component, OnInit } from '@angular/core';
import { UltramarineService } from '../../services/ultramarine.service';
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
export class HomeComponent implements OnInit {

  ultramarines: UltramarineDTO[] = [];
  selectedUltramarine: UltramarineDTO | null = null;

  constructor(
    private ultramarineService: UltramarineService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

   ngOnInit() {
     this.loadUltramarines();
   }

   loadUltramarines() {
     this.ultramarineService.getAll().subscribe(data => {
       this.ultramarines = data;
     });
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

  updateUltramarine(id: number): void {
    this.ultramarineService.getById(id).subscribe({
      next: (result: UltramarineDTO) => {
        this.selectedUltramarine = null;
        setTimeout(() => {
          this.selectedUltramarine = result;
        }, 0);
      },
      error: (err: any) => console.error('Erreur lors de la récupération de l\'ultramarine', err)
    });
  }

  handleInfoUpdate(info: Partial<UltramarineDTO>): void {
    if (this.selectedUltramarine) {
      this.selectedUltramarine = { ...this.selectedUltramarine, ...info };
      console.log('Ultramarine mis à jour dans le parent (infos):', this.selectedUltramarine);
      this.loadUltramarines();
    }
  }
}
