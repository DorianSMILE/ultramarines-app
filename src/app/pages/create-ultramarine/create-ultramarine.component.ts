import { MATERIAL_IMPORTS } from '@app/material';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UltramarineService } from '@services/ultramarine.service';
import { NewUltramarineDTO } from '@models/newultramarine.dto';

@Component({
  selector: 'app-create-ultramarine',
  standalone: true,
  imports: [ReactiveFormsModule, ...MATERIAL_IMPORTS],
  templateUrl: './create-ultramarine.component.html',
  styleUrl: './create-ultramarine.component.scss'
})

export class CreateUltramarineComponent {

  @Output() ultramarineCreated = new EventEmitter<void>();

  constructor(private ultramarineService: UltramarineService) {}

  ultramarineForm = new FormGroup({
    name: new FormControl(''),
    grade: new FormControl('')
  });

  onSubmit() {
    const ultramarineData: NewUltramarineDTO = {
        id: undefined,
        name: this.ultramarineForm.value.name || '',
        grade: this.ultramarineForm.value.grade || ''
      };
    this.ultramarineService.create(ultramarineData).subscribe(
      (response) => {
       this.ultramarineCreated.emit();
       console.log('Utilisateur créé:', response);
      },
      (error) => {
       console.error('Erreur lors de la création:', error);
    });
  }


}
