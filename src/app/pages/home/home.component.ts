import { Component, OnInit } from '@angular/core';
import { UltramarineService } from '../../services/ultramarine.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UltramarineDTO } from '../models/ultramarine.dto';
import { CreateUltramarineComponent } from '../create-ultramarine/create-ultramarine.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, HttpClientModule, CreateUltramarineComponent]
})
export class HomeComponent implements OnInit {

  ultramarines: UltramarineDTO[] = [];

  constructor(private ultramarineService: UltramarineService) {}

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

}
