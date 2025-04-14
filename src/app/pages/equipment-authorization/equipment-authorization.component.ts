import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentAuthorizationService } from '@services/equipment-authorization.service';
import { EquipmentAuthorizationDTO } from '@models/equipment.authorization.dto';

@Component({
  selector: 'app-equipment-authorization',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './equipment-authorization.component.html',
  styleUrls: ['./equipment-authorization.component.scss']
})
export class EquipmentAuthorizationComponent implements OnInit {

  @Input() ultramarineId!: number;
  authorizationData?: EquipmentAuthorizationDTO;
  errorMessage: string = '';

  constructor(private authService: EquipmentAuthorizationService) {}

  ngOnInit(): void {
    if (this.ultramarineId) {
      this.loadAuthorizations();
    }
  }

  loadAuthorizations(): void {
    this.errorMessage = '';
    this.authService.getAuthorizations(this.ultramarineId).subscribe({
      next: (data) => {
        this.authorizationData = data;
      },
      error: (err) => {
        console.error(err);
        this.authorizationData = undefined;
        this.errorMessage = 'Erreur lors du chargement des autorisations';
      }
    });
  }

}
