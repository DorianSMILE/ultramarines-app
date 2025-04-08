import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UltramarineDTO } from '../models/ultramarine.dto';
import { GlobalUpdateService } from '../../services/global-update.service';

@Component({
  selector: 'app-update-ultramarine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-ultramarine.component.html',
  styleUrl: './update-ultramarine.component.scss'
})
export class UpdateUltramarineComponent implements OnInit {

  @Input() ultramarine!: UltramarineDTO;
  @Output() infoUpdate: EventEmitter<Partial<UltramarineDTO>> = new EventEmitter<Partial<UltramarineDTO>>();
  @Output() cancelUpdate: EventEmitter<void> = new EventEmitter<void>();

  updateForm: FormGroup;

  constructor(private fb: FormBuilder, private globalUpdateService: GlobalUpdateService) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      grade: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.ultramarine) {
      this.updateForm.patchValue({
        name: this.ultramarine.name,
        grade: this.ultramarine.grade
      });
    }
    this.updateForm.valueChanges.subscribe(val => {
      this.infoUpdate.emit(val);
    });
  }

  updateInfo(): void {
    if (this.updateForm.valid && this.ultramarine) {
      const updatedDTO: UltramarineDTO = {
        id: this.ultramarine.id,
        name: this.updateForm.value.name,
        grade: this.updateForm.value.grade,
        equipments: null
      };
      this.globalUpdateService.updateGlobal(updatedDTO).subscribe({
        next: updated => {
          console.log('Mise à jour globale réussie (infos) :', updated);
          this.infoUpdate.emit({ name: updated.name, grade: updated.grade });
        },
        error: err => console.error('Erreur lors de la mise à jour globale (infos) :', err)
      });
    }
  }

  onCancel(): void {
    this.cancelUpdate.emit();
  }

}
