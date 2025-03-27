import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UltramarineDTO } from '../models/ultramarine.dto';
import { UltramarineService } from '../../services/ultramarine.service';

@Component({
  selector: 'app-update-ultramarine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-ultramarine.component.html',
  styleUrl: './update-ultramarine.component.scss'
})
export class UpdateUltramarineComponent implements OnInit {

  @Input() ultramarine!: UltramarineDTO;
  @Output() updateComplete = new EventEmitter<boolean>();

  updateForm: FormGroup;

  constructor(private fb: FormBuilder, private ultramarineService: UltramarineService) {
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
  }


  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedUltramarine: UltramarineDTO = {
        ...this.ultramarine,
        ...this.updateForm.value
      };
      this.ultramarineService.update(updatedUltramarine).subscribe({
        next: () => {
          this.updateComplete.emit(true);
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour', error);
          this.updateComplete.emit(false);
        }
      });
    }
  }

  onCancel(): void {
    this.updateComplete.emit(false);
  }

}
