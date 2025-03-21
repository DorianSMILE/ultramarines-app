import { Component } from '@angular/core';
import { UltramarineService } from '../../services/ultramarine.service';
import { UltramarineDTO } from '../models/ultramarine.dto';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search-ultramarine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-ultramarine.component.html',
  styleUrl: './search-ultramarine.component.scss'
})
export class SearchUltramarineComponent {
    //updateUltramarine()
     ultramarines: any[] = [];
}
