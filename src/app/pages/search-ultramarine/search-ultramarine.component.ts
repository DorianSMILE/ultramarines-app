import { Component, OnInit } from '@angular/core';
import { UltramarineService } from '../../services/ultramarine.service';
import { HttpClientModule } from '@angular/common/http';
import { UltramarineDTO } from '../models/ultramarine.dto';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateUltramarineComponent } from '../update-ultramarine/update-ultramarine.component';

@Component({
  selector: 'app-search-ultramarine',
  standalone: true,
  imports: [CommonModule, HttpClientModule, UpdateUltramarineComponent, ReactiveFormsModule],
  templateUrl: './search-ultramarine.component.html',
  styleUrl: './search-ultramarine.component.scss'
})
export class SearchUltramarineComponent implements OnInit {

  researchUltramarineForm: FormGroup;
  ultramarines: UltramarineDTO[] = [];
  selectedUltramarine: UltramarineDTO | null = null;

  constructor(private fb: FormBuilder, private ultramarineService: UltramarineService) {
    this.researchUltramarineForm = this.fb.group({
      username: [''],
    });
  }

  ngOnInit() {
    this.loadUltramarines();
  }

  loadUltramarines() {
    this.ultramarineService.getAll().subscribe(data => {
      this.ultramarines = data;
    });
  }

  onSubmit(): void {
    if (this.researchUltramarineForm.valid) {
      const username = this.researchUltramarineForm.value.username.trim();
      if (!username) {
          this.loadUltramarines();
      } else {
        this.ultramarineService.getByName(username).subscribe({
          next: (results: UltramarineDTO[]) => {
            this.ultramarines = results;
          },
          error: (err: any) => console.error('Erreur lors de la recherche', err)
        });
      }
    }
  }

  updateUltramarine(id: number): void {
    this.ultramarineService.getById(id).subscribe({
      next: (result: UltramarineDTO) => {
        this.selectedUltramarine = result;
      },
      error: (err: any) => console.error('Erreur lors de la récupération de l\'ultramarine', err)
    });
  }

  handleUpdateComplete(updated: boolean): void {
    this.selectedUltramarine = null;
    if (updated) {
      this.loadUltramarines();
    }
  }
}
